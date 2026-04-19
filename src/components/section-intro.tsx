type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="max-w-2xl">
      <p className="fine-label">{eyebrow}</p>
      <div className="section-line" />
      <h2 className="display mt-5 text-[1.55rem] leading-[1.1] text-[var(--text)] md:text-[1.9rem]">
        {title}
      </h2>
      {description ? (
        <p className="soft mt-4 max-w-xl text-[0.92rem] leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
