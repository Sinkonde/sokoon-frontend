export default function ShopAvatar({ name }) {
  return (
    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
      {name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()}
    </div>
  );
}
