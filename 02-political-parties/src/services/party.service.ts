import { PartiesStore, type IPartiesStore } from '../store/parties.store';
import type { PoliticalParty } from '../types';
import { generateUuid } from '../utils/generate-uuid';

class PartyService{

    constructor(private readonly partyStore: IPartiesStore){}

    getAll():PoliticalParty[]{
        return this.partyStore.getAll();
    }

    add(name:string, color:string, borderColor:string): PoliticalParty{
        const newParty: PoliticalParty ={
            id: generateUuid(),
            name: name,
            color: color,
            borderColor: borderColor,
            votes: 0
        };

        this.partyStore.addParty(newParty);
        return newParty;

    }

    update(id:string, updates:Partial<PoliticalParty>):PoliticalParty|null{
        const party = this.partyStore.findById(id);

        if(!party){
            return null;
        }

        if (!updates.name) {
            party.name = updates.name!;
        }

        if (!updates.borderColor) {
            party.borderColor = updates.borderColor!;
        }

        if (!updates.votes) {
            party.votes = updates.votes!;
        }

        return party;


    }

    delete(id:string):boolean{
        return this.partyStore.remove(id);
    }

    incrementVotes(id:string): PoliticalParty|null{
        const party = this.partyStore.findById(id);

        if (!party) {
            return null;
        }

        party.votes +=1 ;

        return party;
    }

    decrementVotes(id:string): PoliticalParty|null{
        const party = this.partyStore.findById(id);

        if (!party) {
            return null;
        }

        party.votes -=1 ;

        return party;
    }

}


//* Instancia de store con DI
const store = new PartiesStore();
export const partyService = new PartyService(store);