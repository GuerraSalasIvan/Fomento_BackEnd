
'use client'

import { format } from "date-fns";
import Image from 'next/image';
import MockImage from '@/public/Image.png';
import EventButtonDetail from '@/app/ui/buttons/EventButtonDetail';


export default function MediumCard({eventData}) {

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="flex items-center">
                <div className="w-1/3">
                    <Image
                        src={MockImage.src}
                        alt="Event Image"
                        width={500} // Establece el ancho deseado de la imagen
                        height={300} // Establece la altura deseada de la imagen
                    />
                </div>
                <div className="w-2/3 p-4">
                    <div className="mb-4">
                        <span className="fecha_event text-sm font-bold text-primary-600">
                            {format(new Date(eventData.available_at), "d MMM yyyy")}
                        </span>
                    </div>
                    <h5 className="text-lg font-bold">{eventData.title}</h5>
                    <p className="text-sm mb-4">
                        {eventData.description && eventData.description.length > 100
                            ? eventData.description.slice(0, 100) + "..."
                            : eventData.description}
                    </p>
                    <EventButtonDetail eventData={eventData}/>

                </div>
            </div>
        </div>
    );
}



