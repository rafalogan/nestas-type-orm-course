import { AuthRecoveryDTO } from 'src/auth/dto/auth-recovery.dto';
import { resetTokenMock } from './reset-token.mock';

export const authRecoveryDTOMock: AuthRecoveryDTO = {
	token: resetTokenMock,
	password: '12223342',
};
