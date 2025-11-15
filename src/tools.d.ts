declare class Tools {
  dnsCheck(domain: string, recordType: string): Promise<any>;
  domainCheck(domain: string): Promise<any>;
  mailCheck(domain: string, dkimSelector?: string): Promise<any>;
  mailHostCheck(domain: string, dkimSelector?: string): Promise<any>;
  subdomainFinder(domain: string): Promise<any>;
  geoIP(ip: string): Promise<any>;
}

export default Tools;
