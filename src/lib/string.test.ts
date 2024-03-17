import {emailRegexp} from '@/lib/string';

describe('emailRegexp', () => {
    it('should match valid emails', () => {
        const validEmails = [
            'valid@email.com',
            'ok@google.com',
        ];
        validEmails.forEach(email => {
            expect(emailRegexp.test(email)).toBe(true);
        });
    });
    it('should not match invalid emails', () => {
        const invalidEmails = [
            'invalid',
            'invalid@',
            'invalid@.com',
            'invalid@com',
            'invalid.com',
            '@invalid.com',
            '@invalid',
        ];
        invalidEmails.forEach(email => {
            expect(emailRegexp.test(email)).toBe(false);
        });
    });
});
