export type ReasonCardProps = {
  title: string;
  reason: string;
};

export default function ReasonCard({ title, reason }: ReasonCardProps) {
  return (
    <div
      className="flex flex-col flex-wrap bg-rose-900/20 rounded-2xl p-6 sm:p-8 text-center shadow-lg text-slate-800
 gap-4 justify-center items-center "
    >
      <h3 className="text-xl font-semibold text-rose-900 mx-auto ">{title}</h3>
      <p className="text-lg text-rose-900/70 mx-auto">{reason}</p>
    </div>
  );
}
