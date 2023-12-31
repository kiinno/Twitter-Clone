import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            size={20}
            onClick={handleBack}
            color="white"
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
        )}
        <h1 className="text-xl font-semibold capitalize">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
