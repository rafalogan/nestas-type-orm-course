import { userEntityListMock } from './user-entity-list.mock';

const { id, name, email, birthAt } = userEntityListMock[0];

export const jwtPayloadMock = {
	id,
	name,
	email,
	birthAt,
	iat: 1672197163,
	exp: 1672801963,
	aud: 'users',
	iss: 'login',
	sub: '1',
};
