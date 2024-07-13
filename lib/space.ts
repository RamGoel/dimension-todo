import axios from 'axios'

export class Space {
    constructor(private readonly fetchHost: string) {}

    public async exists(spaceID: string): Promise<boolean> {
        const spaceExistRes = await this.fetchJSON('spaceExists', spaceID)
        if (
            spaceExistRes &&
            typeof spaceExistRes === 'object' &&
            typeof spaceExistRes.spaceExists === 'boolean'
        ) {
            return spaceExistRes.spaceExists
        }
        throw new Error('Bad response from spaceExists')
    }

    public async create(spaceID?: string) {
        try {
            const createSpaceRes = await this.fetchJSON('createSpace', spaceID)

            if (
                createSpaceRes &&
                typeof createSpaceRes === 'object' &&
                typeof createSpaceRes.spaceID === 'string'
            ) {
                return createSpaceRes.spaceID
            }
        } catch (e) {
            console.error('Failed white creating space: ', e)
        }
    }

    private async fetchJSON(apiName: string, spaceID: string | undefined) {
        try {
            const res = await axios.post(
                `${this.fetchHost}/api/replicache/${apiName}`,
                spaceID
                    ? JSON.stringify({
                          spaceID,
                      })
                    : {}
            )

            console.log('fetchJSON', apiName, spaceID, res.data)

            return res.data
        } catch (e) {
            console.error('Failed while fetching JSON', e, apiName, spaceID)
        }
    }
}
