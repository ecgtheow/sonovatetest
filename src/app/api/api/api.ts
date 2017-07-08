export * from './candidates.service';
import { CandidatesService } from './candidates.service';
export * from './clients.service';
import { ClientsService } from './clients.service';
export * from './placements.service';
import { PlacementsService } from './placements.service';
export const APIS = [CandidatesService, ClientsService, PlacementsService];
