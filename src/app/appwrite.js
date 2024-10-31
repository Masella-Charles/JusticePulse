import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67011f29003d00dfef5c') // Replace with your project ID
    .setKey('standard_5067d67b2f6f21aea2e9c7f8e483a023e86088e5d750a70b88706c59bac077efa9587968aa549435a76018438c4cd8a40400364d59638fc2ce7a928329092a0a9c07da8cf9edc127fda31440abfaec3cdd8ff8445781852a427c60308675b8a40ac436199e51a795674177314eb5306613de60d95e4f4a19274a949257ca9a26')

export const account = new Account(client);
export { ID } from 'appwrite';
