declare class Games {
  minecraft(address: string, port?: string): Promise<any>;
  fivem(address: string, port?: string): Promise<any>;
}

export default Games;
