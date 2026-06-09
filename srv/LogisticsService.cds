using { exam.logistics as ex} from '../db/schema';


service LogisticsService @(path: '/logistics') {

    entity Shipments as select from ex.Shipments;

    @readonly
    entity Packages as projection on ex.Packages;

}