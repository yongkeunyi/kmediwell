import { createCrudFactory, createGencowHttpRouteBuilders, createGencowProcedureBuilders, } from "@gencow/core";
export const procedure = createGencowProcedureBuilders();
export const httpRoute = createGencowHttpRouteBuilders();
export const createCrud = createCrudFactory(procedure);
