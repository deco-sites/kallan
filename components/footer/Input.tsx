export interface InputProps {
  name?: string;
  placeholder?: string;
}

function Input({ name, placeholder }: InputProps) {
  return (
    <input
      class="lg:w-[200px] w-full h-[37px] bg-white pl-2 py-2.5 text-[14px]"
      placeholder={placeholder}
    />
  );
}

export default Input;
