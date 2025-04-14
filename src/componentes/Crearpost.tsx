import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EyeOffIcon, ImageIcon } from "lucide-react";
import React, { JSX } from "react";

export default function AgregarPost(): JSX.Element {
  // Data for the action buttons
  const actionButtons = [
    {
      text: "Agregar Foto/Video",
      icon: <ImageIcon className="w-10 h-10" />,
    },
    {
      text: "Post Incognito",
      icon: <EyeOffIcon className="w-10 h-10" />,
    },
  ];

  return (
    <Card className="w-[820px] rounded-[20px] p-0 shadow-lg">
      <CardContent className="p-0">
        {/* Profile and input section */}
        <div className="flex items-center justify-center gap-10 p-2.5 h-[90px]">
          <Avatar className="w-[60px] h-[60px] border border-solid border-[#00000019] bg-neutral-100">
            <AvatarImage src="" alt="Profile" className="object-cover" />
            <AvatarFallback className="bg-[#f0f0f0] border-2 border-solid border-black">
              {/* Placeholder for profile image */}
            </AvatarFallback>
          </Avatar>

          <div className="w-[611px] h-[67px] bg-[#bab8b8] rounded-[30px] flex items-center pl-5">
            <span className="font-normal text-white text-[32px] whitespace-nowrap">
              Que es lo que estas pensando??
            </span>
          </div>
        </div>

        {/* Separator line */}
        <div className="px-[27px]">
          <Separator className="h-1" />
        </div>

        {/* Action buttons section */}
        <div className="flex items-center justify-center gap-[100px] p-2.5 h-20 mx-[30px] my-[29px]">
          {actionButtons.map((button, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-2.5 rounded-[20px] cursor-pointer"
            >
              <span className="font-normal text-black text-[32px] whitespace-nowrap">
                {button.text}
              </span>
              {button.icon}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
