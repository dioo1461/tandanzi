export const EMAIL_ERROR_TYPE = {
    unwritten: 'unwritten',
    confirmed: 'confirmed',
    invalid_form: 'invalid_form', // 이메일 형식 미부합
    existing_email: 'existing_email', // 이미 존재하는 이메일
}

export const PASS_ERROR_TYPE = {
    unwritten: 'unwritten',
    confirmed: 'confirmed',
    short_length: 'short_length', // 최소 6자
    unpermitted_character: 'unpermitted_character', // 영어, 숫자, 특수문자만 가능
    non_mixed: 'non_mixed', // 특수문자 최소 1개 포함
    confirmation_unmatch: 'confirmation_unmatch', // 두 비밀번호가 일치하지 않음
}

export const USERNAME_ERROR_TYPE = {
    unwritten: 'unwritten',
    confirmed: 'confirmed',
    existing_username: 'existing_username'
}