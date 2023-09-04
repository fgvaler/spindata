
import fs from 'fs';

import { NextResponse } from 'next/server'
// import { Teams } from '@/external/showdown/sim'


import {BattleStream, getPlayerStreams, Teams} from '@/external/showdown/sim';
import {RandomPlayerAI} from '@/external/showdown/sim/tools/random-player-ai';



export async function GET(request: Request) {



/*********************************************************************
 * Run AI
 *********************************************************************/

    const streams = getPlayerStreams(new BattleStream());

    const spec = {
        formatid: "gen7customgame",
    };
    const p1spec = {
        name: "Bot 1",
        team: Teams.pack(Teams.generate('gen7randombattle')),
    };
    const p2spec = {
        name: "Bot 2",
        team: Teams.pack(Teams.generate('gen7randombattle')),
    };

    const p1 = new RandomPlayerAI(streams.p1);
    const p2 = new RandomPlayerAI(streams.p2);

    console.log("p1 is " + p1.constructor.name);
    console.log("p2 is " + p2.constructor.name);

    void p1.start();
    void p2.start();

    const turns = [];
    for await (const chunk of streams.omniscient) {
        turns.push(chunk);
    }

    void streams.omniscient.write(`>start ${JSON.stringify(spec)}
    >player p1 ${JSON.stringify(p1spec)}
    >player p2 ${JSON.stringify(p2spec)}`);

    // const raw_txt = fs.readFileSync('./src/app/testapi/zama.txt', 'utf-8');
    // const team = Teams.import(raw_txt)

    return NextResponse.json({ turns })
}
