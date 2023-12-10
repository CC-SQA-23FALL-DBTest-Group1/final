// Written by Frederick
// Version 1
// Last update: 2023-12-10
import {
  Customer, Employee, EmployeeVehicleTypeOperation, MechanicVehicleType, Shipment, ShipmentRoute, TransitPoint,
  Trip, Vehicle, VehicleRepairRecord, VehicleType
} from "../strategy/postgresql/models"

export enum Operation {
  OK = "OK",
  Failed = "FAILED",
}


export default interface PersistenceService {


  // ------------------------- Customer -------------------------
  // Create:
  createCustomer: (name: string, address: string,
    phoneNumber1: string, phoneNumber2?: string) => Customer | Operation.Failed;
  // Update:
  updateCustomer: (id: number, name: string, address: string,
    phoneNumber1: string, phoneNumber2?: string) => Customer | Operation.Failed;
  // Read:
  findCustomerByID: (id: number) => Customer | null;
  findCustomers: (name?: string, address?: string, phoneNumber?: string) => [Customer];
  // Delete:
  deleteCustomerByID: (id: number) => Operation;


  // ------------------------- Employee -------------------------
  // Create:
  createEmployee: (firstName: string, lastName: string,
    seniority: number, vehicleType: VehicleType) => Employee | Operation.Failed;
  // Update:
  updateEmployee: (id: number, firstName: string, lastName: string,
    seniority: number) => Employee | Operation.Failed;
  // Read:
  findEmployeeByID: (id: number) => Employee | null;
  findEmployees: (_: (_: Employee) => boolean) => [Employee];
  // Delete:
  deleteEmployeeByID: (id: number) => Operation;


  // ------------------------- Vehicle -------------------------
  // Create:
  createVehicle: (brand: string, model: string,
    capacity: number, year: number) => Vehicle | Operation.Failed;
  // Update:
  updateVehicle: (id: number, brand: string, model: string,
    capacity: number, year: number) => Vehicle | Operation.Failed;
  // Read:
  findVehicleByID: (id: number) => Vehicle | null;
  findVehicles: (_: (_: Vehicle) => boolean) => [Vehicle];
  // Delete:
  deleteVehicleByID: (id: number) => Operation;


  // ------------------------- Vehicle Type -------------------------
  // Create:
  createVehicleType: (name: string) => VehicleType | Operation.Failed;
  // Update:
  updateVehicleType: (id: number, name: string) => VehicleType | Operation.Failed;
  // Read:
  findVehicleTypeByID: (id: number) => VehicleType | null;
  findVehicleTypes: (_: (_: VehicleType) => boolean) => [VehicleType];
  // Delete:
  deleteVehicleTypeByID: (id: number) => Operation;


  // ------------------------- Transit Point -------------------------
  // Create:
  createTransitPoint: (name: string) => TransitPoint | Operation.Failed;
  // Update:
  updateTransitPoint: (id: number, name: string) => TransitPoint | Operation.Failed;
  // Read:
  findTransitPointByID: (id: number) => TransitPoint | null;
  findTransitPoints: (_: (_: TransitPoint) => boolean) => [TransitPoint];
  // Delete:
  deleteTransitPointByID: (id: number) => Operation;


  // ------------------------- Employee Vehicle Type Operation -------------------------
  // Create:
  createEmployeeVehicleTypeOperation: (employee: Employee,
    vehicleType: VehicleType) => EmployeeVehicleTypeOperation | Operation.Failed;
  // Update:
  updateEmployeeVehicleTypeOperation: (employee: Employee, oldVehicleType: VehicleType,
    newVehicleType: VehicleType) => EmployeeVehicleTypeOperation | Operation.Failed;
  // Read:
  findEmployeeVehicleTypeOperation: (employee: Employee,
    vehicleType: VehicleType) => EmployeeVehicleTypeOperation | null;
  findEmployeeVehicleTypeOperations: (employee: Employee) => [EmployeeVehicleTypeOperation];
  // Delete:
  deleteEmployeeVehicleTypeOperation: (employee: Employee,
    vehicleType: VehicleType) => Operation;


  // ------------------------- Mechanic Vehicle Type -------------------------
  // Create:
  createMechanicVehicleType: (employee: Employee,
    vehicleType: VehicleType, status: boolean) => MechanicVehicleType | Operation.Failed;
  // Update:
  updateMechanicVehicleType: (employee: Employee, oldVehicleType: VehicleType,
    newVehicleType: VehicleType, status: boolean) => MechanicVehicleType | Operation.Failed;
  // Read:
  findMechanicVehicleType: (employee: Employee,
    vehicleType: VehicleType) => MechanicVehicleType | null;
  findMechanicVehicleTypesByEmployee: (employee: Employee) => [MechanicVehicleType];
  findMechanicVehicleTypesByType: (vehicleType: VehicleType) => [MechanicVehicleType];
  // Delete:
  deleteMechanicVehicleType: (employee: Employee,
    vehicleType: VehicleType) => Operation;


  // ------------------------- Vehicle Repair Record -------------------------
  // Create:
  createVehicleRepairRecord: (mechanic: Employee, vehicle: Vehicle,
    estimatedTime: number, actualTime: number) => VehicleRepairRecord | Operation.Failed;
  // Update:
  updateVehicleRepairRecord: (id: number, mechanic: Employee, vehicle: Vehicle,
    estimatedTime: number, actualTime: number) => VehicleRepairRecord | Operation.Failed;
  // Read:
  findVehicleRepairRecordByID: (id: number) => VehicleRepairRecord | null;
  findVehicleRepairRecords: (predicate: (record: VehicleRepairRecord) => unknown) => [VehicleRepairRecord];
  // Delete:
  deleteVehicleRepairRecordByID: (id: number) => Operation;


  // ------------------------- Shipment -------------------------
  // Create:
  createShipment: (customer: Customer, from: TransitPoint, to: TransitPoint, weight: number,
    value: number) => Shipment | Operation.Failed;
  // Update:
  updateShipment: (id: number, customer: Customer, from: TransitPoint, to: TransitPoint,
    weight: number, value: number) => Shipment | Operation.Failed;
  // Read:
  findShipmentByID: (id: number) => Shipment | null;
  findShipments: (predicate: (record: Shipment) => unknown) => [Shipment];
  // Delete:
  deleteShipmentByID: (id: number) => Operation;


  // ------------------------- Trip -------------------------
  // Create:
  createTrip: (vehicle: Vehicle, from: TransitPoint, to: TransitPoint, driver1: Employee,
    driver2?: Employee) => Trip | Operation.Failed;
  // Update:
  updateTrip: (id: number, vehicle: Vehicle, from: TransitPoint, to: TransitPoint, driver1: Employee,
    driver2?: Employee) => Trip | Operation.Failed;
  // Read:
  findTripByID: (id: number) => Trip | null;
  findTrips: (predicate: (record: Trip) => unknown) => [Trip];
  // Delete:
  deleteTripByID: (id: number) => Operation;


  // ------------------------- Shipment Route -------------------------
  // Create:
  createShipmentRoute: (shipment: Shipment, order: number,
     trip: Trip) => ShipmentRoute | Operation.Failed;
  // Update:
  updateShipmentRoute: (shipment: Shipment, order: number,
    trip: Trip) => ShipmentRoute | Operation.Failed;
  // Read:
  findShipmentRoute: (shipment: Shipment, order: number) => ShipmentRoute | null;
  findShipmentRoutes: (predicate: (record: ShipmentRoute) => unknown) => [ShipmentRoute];
  // Delete:
  deleteShipmentRouteByID: (id: number) => Operation;
}
