import Link from "next/link";
import React from "react";

import UploadButton from "../Upload-button";
import { Upload } from "lucide-react";

const Header = ({ setisOpened }: { setisOpened: any }) => {
  return (
    <header className="w-full flex justify-between items-center relative px-4 pb-5">
      <div className="text-2xl font-bold bg-gradient-to-r from-brand to-blue text-transparent bg-clip-text">
        Akuratama ICT
      </div>

      <div>
        <button
          onClick={() => setisOpened((prev: any) => !prev)}
          type="button"
          className="bg-brand text-white px-4 py-2 rounded-3xl flex justify-center items-center gap-3"
        >
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
