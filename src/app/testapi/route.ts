
import fs from 'fs';

import { NextResponse } from 'next/server'
import { Teams } from '@/external/showdown/sim'


export async function GET(request: Request) {

    const raw_txt = fs.readFileSync('./src/app/testapi/zama.txt', 'utf-8');
    const team = Teams.import(raw_txt)

    return NextResponse.json({ team })
}
