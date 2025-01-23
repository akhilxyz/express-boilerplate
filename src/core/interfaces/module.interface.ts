import { Router } from "express";

export interface IModule {
    routes: Router;
    controller: any;  // You can make this more specific based on your needs
  }