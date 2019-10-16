validProof (lastProof, proof) {
    const guessHash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
    .update(`${lastProof}${proof}`)
    .digest('hex')
    return guessHash.substr(0,5) === process.env.RESOLUTION_HASH
}

proofOfWork (lastProof) {
    let proof = 0
    while (true) {
        if (!this.validProof(lastProof, proof)) {
            proof++
        } else {
            break
        }
    }
}