interface TextInputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    className?: string; // 추가적인 커스텀 스타일
}

export const TextInput = ({
                                      label,
                                      type = "text",
                                      placeholder = "",
                                      className = "",
                                  }: TextInputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-semibold text-gray-300">
                    {label} <span className="text-red-500">*</span>
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`bg-[#1e1f22] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[rgb(155,155,155)]-500 placeholder-gray-500 text-sm ${className}`}
            />
        </div>
    );
}