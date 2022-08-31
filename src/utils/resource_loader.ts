export interface IResourceLoaderTarget{
    ingest(line: string): void;
}
export class ResourceLoader {
    static async load(url: string, target: IResourceLoaderTarget): Promise<void> {
        const response = await fetch(url);
        const text = await response.text();
        const lines = text.split('\n');
        lines.forEach(line => {
            if(line && line.length > 0) {
                target.ingest(line);
            }
        });
    }
}