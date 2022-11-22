import LibGenerateTestUserSig from './lib-generate-test-usersig-es.min';

export function getUserInfo({sdkAppId=0,SecretKey='',userId=''}) {
    const expireTime = 604800;
    const generator = new LibGenerateTestUserSig(sdkAppId, SecretKey, expireTime);
    const userSig = generator.genTestUserSig(userId);
    const shareUserId = `share_${userId}`;
    const shareUserSig = generator.genTestUserSig(shareUserId);
    return {
        sdkAppId,
        userId,
        userSig,
        userName:`user_${userId}`,
        userAvatar:'',
        shareUserId,
        shareUserSig,
    };
}
