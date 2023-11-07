import { accessTokenMock } from './token.mock';
import { userEntityListMock } from './user-entity-list.mock';

const { id, name, email, birthAt } = userEntityListMock[1];

export const payloadMock = {
	id,
	name,
	email,
	birthAt,
	accessToken: accessTokenMock,
};
