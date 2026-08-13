interface OutlinedTextProps {
  text: string;
  className?: string;
}

export const OutlinedText = ({ text, className = '' }: OutlinedTextProps) => {
  return (
    <span
      className={className}
      style={{
        WebkitTextStroke: '2px #0A0A0A',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </span>
  );
};

// Helper for consistent outlined text styling
export const outlinedTextClass = "font-black text-transparent";
