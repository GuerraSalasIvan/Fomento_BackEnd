import LeftArrowLink from '@/app/ui/links/LeftArrowLink';

import TitleBluePadding from '@/app/ui/titles/TitleBluePadding';
import BigCard from '@/app/ui/cards/events/BigCard';

export default async function ListSectionEvent({eventData}) {
    return (
        <>
            <LeftArrowLink href={'/home'}/>
            <TitleBluePadding text={'Eventos'} />
            <div className="grid grid-cols-3 my-6">
                {eventData.map((event, index) => (
                    <div key={index} className="m-3">
                        <BigCard eventData={event} />
                    </div>
                ))}
            </div>
        </>
    );
}