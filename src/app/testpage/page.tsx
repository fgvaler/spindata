
import { process_movesets } from '@/lib/process_raw_data';

export default async function page(){
    const data = await process_movesets();
    return <div className="whitespace-pre">{JSON.stringify(data, null, 2)}</div>
};
