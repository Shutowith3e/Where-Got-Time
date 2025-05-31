export type ReasonCardProps = {
  title: string;
  reason: string;
};

export default function ReasonCard({ title, reason }: ReasonCardProps) {
  return (
    <div className="flex flex-col flex-wrap bg-gradient-to-b from-rose-950/66 to-rose-900/70 space-y-6 space-x-4 text-center rounded-3xl justify-center items-center">
      <h3 className="text-xl font-semibold text-rose-50 pl-10 pr-10 pt-6">
        {title}
      </h3>
      <p className="text-lg text-rose-100 pl-10 pr-10 pb-8">{reason}</p>
    </div>
  );
}
