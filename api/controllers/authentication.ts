
import db from '../../database';
import config from '../../config';

const bcrypt_sha512 = require('sha512crypt-node');

export class AuthenticationController {
    async tryRegister(username: string, password: string) {
        try {
            return await db.transaction(async (trx) => {
                const userId = (await trx.insert({ username, role_id: 1 }).into('users').returning('id'));
                console.log(userId);

                const credentials = this.getCredentials(+userId, password);
                const hash = this.hash(credentials); 
                
                await trx('users').update({credentials_hash: hash}).where('id', +userId);
    
                const token = this.createToken(username, 1, +userId);
    
                return { success: true, token: token };
            });
        }
        catch(err) {
            const users = db.select('username').from('users').where('userame', username).limit(1);

            if (users)  {
                return { success: false, message: 'Error happened', token: undefined };
            }

            throw err;
        }
    }

    private getCredentials(userId: number, password: string) {
        return userId + ':' + password;
    }

    private hash(value: string) {
        return bcrypt_sha512.sha512crypt(value, `\$6\$rounds=${config.rounds}\$${config.salt}`);
    }

    private createToken(name: string, role: number, userId: number) {
        return {
            userId: userId,
            name: name,
            role: role
        };
    }

    async tryLogin(username: string, password: string) {
        const users = await db.select('id', 'credentials_hash', 'username', {role: 'role_id'}).from('users').where('username', username).limit(1);

        if (!users) {
            return {
                success: false, 
                reason: `That username doens't exist`
            }
        }

        const user = users[0];

        const credentials = this.getCredentials(user.id, password);
        const success =  this.validateCredentials(credentials, user.credentials_hash)
    
        if (!success) {
            return { success: false, message: 'Incorrect password.' };
        }
        
        var token = this.createToken(user.username, user.role, user.id);
                    
        return { success: true, token: token }; 
    }

    private validateCredentials(credentialsToBeVerified: string, hash: string){
        const authenticationHash = bcrypt_sha512.sha512crypt(credentialsToBeVerified, hash)
        return hash === authenticationHash;
    }
}