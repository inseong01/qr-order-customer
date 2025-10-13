import LogoImage from "@/feature/components/logo/logo-index";
import RowSpaceBetween from "../(router)/components/horizontal-stack/stack-between/between-index";

export default function HeaderTop() {
  return (
    <RowSpaceBetween tag="div">
      <LogoImage />
      {/* <LanguageButton /> */}
    </RowSpaceBetween>
  );
}

function LanguageButton() {
  return (
    <div className={"relative flex cursor-pointer items-center gap-2"}>
      <div className="text-sm">KO</div>
    </div>
  );
}
