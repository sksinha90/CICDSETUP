namespace exam.logistics;

type TransportMode : String enum {
    A = 'Air';
    S = 'Sea';
    R = 'Rail'
};

entity Shipments {
 key        ID          : UUID;
            customer    : String(255);
            mode        : TransportMode;
            //@Core.Computed: false
 virtual    totalWeight : Decimal(10, 2);
            //@Core.Computed: false
 virtual    shipmentFee : Decimal(10, 2);
            packages    : Composition of many Packages on packages.parent = $self;
}

entity Packages {
  key   ID          : UUID;
        contents    : String(255);
        weight      : Decimal(10, 2);
        parent      : Association to Shipments;
}
