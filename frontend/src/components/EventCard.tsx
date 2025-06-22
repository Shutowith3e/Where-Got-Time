type Event = {
  highPriority: boolean;
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

function EventChip({
  event: { highPriority, event, group, date },
}: EventChipProps) {
  return (
    <div className="flex flex-row bg-slate-100 m-auto rounded-2xl text-base font-semibold px-8 py-1 gap-x-4 mt-2 min-w-45">
      <div className="text-sm font-light m-auto">{date}</div>
      {group.toUpperCase()} - {event}
      {highPriority && (
        <div className="text-sm font-light m-auto ">High Priority</div>
      )}
    </div>
  );
}

export default function EventCard({ title, events }: EventCardProps) {
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl m-4 gap-y-0.5 drop-shadow-xl drop-shadow-rose-800/8 ">
      <h3 className="text-xl mx-auto font-bold px-4 mb-4">{title}</h3>
      {events
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((x, i) => (
          <EventChip key={i} event={x} />
        ))}
    </div>
  );
}
