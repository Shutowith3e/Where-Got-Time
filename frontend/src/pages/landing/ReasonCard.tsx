export type ReasonCardProps = {
  title: string;
  reason: string;
};

export default function ReasonCard({ title, reason }: ReasonCardProps) {
  return (
    <div className="flex flex-col flex-wrap bg-rose-900/80 space-y-6 space-x-4 text-center rounded-3xl justify-center items-center">
      <h3 className="text-xl font-semibold text-rose-50 pl-8 pr-8 pt-4">
        {title}
      </h3>
      <p className="text-lg text-rose-100 pl-8 pr-8 pb-8">{reason}</p>
    </div>
  );
}
