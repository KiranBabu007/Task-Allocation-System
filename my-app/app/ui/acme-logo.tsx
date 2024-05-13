import { CommandLineIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
        >
            <CommandLineIcon className="pl-2 mr-2 h-20 w-20 rotate-[15deg]  " />
            <p className=" text-[24px]">Task Allocator</p>
        </div>
    );
}