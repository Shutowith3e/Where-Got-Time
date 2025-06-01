export type ReasonCardProps = {
  title: string;
  reason: string;
};

export default function ReasonCard({ title, reason }: ReasonCardProps) {
  return (
    <div className="flex flex-col flex-wrap bg-gradient-to-b from-rose-950/66 to-rose-900/70 space-y-6 space-x-4 text-center rounded-3xl justify-center items-center">
      <h3 className="text-xl font-semibold text-rose-50 mx-auto pt-6">
        {title}
      </h3>
      <p className="text-lg text-rose-100 mx-auto my-3 pb-8">{reason}</p>
    </div>
  );
}
