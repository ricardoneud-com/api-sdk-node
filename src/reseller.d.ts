declare class Reseller {
  checkLicense(licenseKey: string): Promise<any>;
  generateLicense(data: {
    registeredTo: string;
    domainOrIp: string;
    status: string;
    productId: string;
    projectId: string;
  }): Promise<any>;
  updateLicense(licenseKey: string, data: any): Promise<any>;
  deleteLicense(licenseKey: string): Promise<any>;
}

export default Reseller;
