const cds = require('@sap/cds');

class LogisticsService extends cds.ApplicationService {

    init() {
        const { Shipments, Packages } = this.entities;

        this.after('READ', Shipments, async shipments => {

            console.log(shipments);

            const rates = {
                'Air': 15,
                'Sea': 5,
                'Rail': 8
            };

            for (const shipment of shipments) {
                const packages = await cds.run(SELECT.from(Packages).where({ parent_ID: shipment.ID }));
                console.log(`Packages of shipment ${shipment.ID}:`, packages);

                const totalWeight = packages.reduce((total, pkg) => parseFloat(total) + parseFloat(pkg.weight), 0);
                console.log(`Total weight of shipment ${shipment.ID}: ${totalWeight}`);

                const shipmentFee = totalWeight * parseFloat(rates[shipment.mode]);
                console.log(`Shipment fee of shipment ${shipment.ID}: ${shipmentFee}`);

                shipment.totalWeight = totalWeight;
                shipment.shipmentFee = shipmentFee;
            }
        });

        return super.init();
    }
}

module.exports = LogisticsService;
