"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventItem {
  id: number;
  description: string;
  photo: string;
  createdAt?: string;
}

function getWrappedOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

export function EventDomeGallery() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadEvents = async () => {
      try {
        const res = await fetch("/api/our-event", { cache: "no-store" });
        const data = await res.json();
        if (mounted) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch {
        if (mounted) {
          setEvents([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadEvents();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (events.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % events.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [events.length]);

  const goTo = (index: number) => {
    if (!events.length) return;
    setActiveIndex((index + events.length) % events.length);
  };

  const activeEvent = events[activeIndex];

  return (
    <div className="space-y-8">
      <div className="relative isolate overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(5,5,5,0.96)_65%)] px-4 pb-10 pt-8 sm:px-8 sm:pb-14">
        <div className="pointer-events-none absolute inset-x-[12%] bottom-0 h-[62%] rounded-t-[999px] border border-white/10 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_60%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-[20%] top-6 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {loading ? (
          <div className="flex h-[24rem] items-center justify-center text-center">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-10">
              <p className="font-bebas text-3xl uppercase tracking-[0.18em] text-white">Loading Events</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-white/35">
                Building the dome gallery
              </p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex h-[24rem] items-center justify-center text-center">
            <div className="max-w-md rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-10">
              <p className="font-bebas text-3xl uppercase tracking-[0.18em] text-white">No Event Photos Yet</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-white/35">
                Add images from the Our Event tab in the admin dashboard
              </p>
            </div>
          </div>
        ) : (
          <div className="relative h-[24rem] sm:h-[28rem] lg:h-[32rem] [perspective:1800px]">
            {events.map((event, index) => {
              const offset = getWrappedOffset(index, activeIndex, events.length);
              if (Math.abs(offset) > 3) return null;

              const distance = Math.abs(offset);
              const translateX = offset * 18;
              const translateY = distance * distance * 1.9 + 1.25;
              const translateZ = -distance * 7;
              const rotateY = offset * -18;
              const rotateZ = offset * 2.5;
              const scale = 1 - distance * 0.12;
              const opacity = 1 - distance * 0.18;

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="absolute left-1/2 top-4 w-[clamp(11rem,24vw,18rem)] -translate-x-1/2 overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/55 text-left shadow-[0_28px_80px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out"
                  style={{
                    zIndex: 50 - distance,
                    opacity,
                    transform: `translateX(calc(-50% + ${translateX}vw)) translateY(${translateY}rem) translateZ(${translateZ}rem) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                  }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={event.photo}
                      alt={event.description}
                      className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                      Event {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 line-clamp-3 font-mono text-xs uppercase tracking-[0.16em] text-white/80">
                      {event.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeEvent && (
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
              Highlighted Moment
            </p>
            <p className="mt-3 max-w-3xl font-mono text-sm uppercase leading-7 tracking-[0.16em] text-white/70">
              {activeEvent.description}
            </p>
          </div>

          {events.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.08]"
                aria-label="Previous event"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.08]"
                aria-label="Next event"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
