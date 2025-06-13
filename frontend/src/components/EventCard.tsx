type Event = {
  count: number;
  group: string;
  event: string;
  date: string;
};

type EventChipProps = {
  event: Event;
};

export type EventCardProps = {
  title: string;
  events: Event[];
};

function EventChip({ event: { count, event, group, date } }: EventChipProps) {
  return (
    <div className="flex flex-row bg-white m-auto rounded-2xl text-base font-semibold px-8 py-1 gap-x-4 mt-2 min-w-45">
      <div className="text-sm font-light m-auto">{date}</div>
      {group.toUpperCase()} - {event}
      <div className="text-sm font-light m-auto">({count} Members)</div>
    </div>
  );
}

export default function EventCard({ title, events }: EventCardProps) {
  return (
    <div className="flex flex-col bg-violet-300/15 p-4 rounded-lg m-4">
      <h3 className="text-xl mx-auto font-bold px-4 ">{title}</h3>
      {events.map((x) => (
        <EventChip event={x} />
      ))}
    </div>
  );
}
