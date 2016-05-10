require = (function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)return a(o, !0);
                if (i)return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {exports: {}};
            t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }

    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)s(r[o]);
    return s
})({
    "tmvhGl": [function (require, module, exports) {
        (function (e) {
            var i = function (e, i) {
                Object.defineProperty(module.exports, e, {
                    get: function () {
                        return require(i)
                    }
                })
            };
            i("Bignum", "bignum"), Object.defineProperty(module.exports, "bignum", {
                get: function () {
                    return console.log('bignum (with a lower-case "b") is deprecated. Use bitcore.Bignum (capital "B") instead.'), require("bignum")
                }
            }), i("Base58", "./lib/Base58"), Object.defineProperty(module.exports, "base58", {
                get: function () {
                    return console.log('base58 (with a lower-case "b") is deprecated. Use bitcore.Base58 (capital "B") instead.'), require("./lib/Base58")
                }
            }), i("bufferput", "bufferput"), i("buffertools", "buffertools"), i("Buffers.monkey", "./patches/Buffers.monkey"), i("config", "./config"), i("const", "./const"), i("Deserialize", "./lib/Deserialize"), i("ECIES", "./lib/ECIES"), i("log", "./util/log"), i("networks", "./networks"), i("SecureRandom", "./lib/SecureRandom"), i("sjcl", "./lib/sjcl"), i("util", "./util/util"), i("EncodedData", "./util/EncodedData"), i("VersionedData", "./util/VersionedData"), i("BinaryParser", "./util/BinaryParser"), i("Address", "./lib/Address"), i("AuthMessage", "./lib/AuthMessage"), i("HierarchicalKey", "./lib/HierarchicalKey"), i("BIP21", "./lib/BIP21"), Object.defineProperty(module.exports, "BIP32", {
                get: function () {
                    return console.log("BIP32 is deprecated. Use bitcore.HierarchicalKey instead."), require("./lib/HierarchicalKey")
                }
            }), i("BIP39", "./lib/BIP39"), i("BIP39WordlistEn", "./lib/BIP39WordlistEn"), i("Point", "./lib/Point"), i("Opcode", "./lib/Opcode"), i("Script", "./lib/Script"), i("Transaction", "./lib/Transaction"), i("TransactionBuilder", "./lib/TransactionBuilder"), i("Connection", "./lib/Connection"), i("PayPro", "./lib/PayPro"), i("Peer", "./lib/Peer"), i("Block", "./lib/Block"), i("ScriptInterpreter", "./lib/ScriptInterpreter"), i("Bloom", "./lib/Bloom"), i("Key", "./lib/Key"), Object.defineProperty(module.exports, "KeyModule", {
                get: function () {
                    return console.log("KeyModule is deprecated."), require("bindings")("KeyModule")
                }
            }), i("SINKey", "./lib/SINKey"), i("SIN", "./lib/SIN"), i("PrivateKey", "./lib/PrivateKey"), i("RpcClient", "./lib/RpcClient"), i("Wallet", "./lib/Wallet"), i("WalletKey", "./lib/WalletKey"), i("PeerManager", "./lib/PeerManager"), i("Message", "./lib/Message"), i("Electrum", "./lib/Electrum"), i("Armory", "./lib/Armory"), i("NetworkMonitor", "./lib/NetworkMonitor"), module.exports.Buffer = e
        }).call(this, require("buffer").Buffer);
    }, {"./lib/Base58": "6VqyzY", "./lib/HierarchicalKey": "x1O6JW", "bignum": 49, "bindings": 70, "buffer": 78}],
    "bitcore": [function (require, module, exports) {
        module.exports = require('tmvhGl');
    }, {}],
    "4itQ50": [function (require, module, exports) {
        module.exports = {network: "livenet", logger: "normal"};
    }, {}],
    "./config": [function (require, module, exports) {
        module.exports = require('4itQ50');
    }, {}],
    "./const": [function (require, module, exports) {
        module.exports = require('f08cvL');
    }, {}],
    "f08cvL": [function (require, module, exports) {
        MSG = {TX: 1, BLOCK: 2, FILTERED_BLOCK: 3}, MSG.to_str = function (t) {
            switch (t) {
                case MSG.TX:
                    return "transaction";
                case MSG.BLOCK:
                    return "block";
                case MSG.FILTERED_BLOCK:
                    return "filtered block";
                default:
                    return "unknown"
            }
        }, exports.MSG = MSG;
    }, {}],
    "G+CcXD": [function (require, module, exports) {
        (function (e) {
            "use strict";
            function r(t, i) {
                if (i && i.length && (!e.isBuffer(i) || 20 != i.length))throw new Error("Hash must be 20 bytes");
                r.super_.call(this, t, i)
            }

            var t = require("../util"), i = require("../util/VersionedData"), n = require("../util/EncodedData"), s = require("../networks"), o = require("./Script"), u = require("util");
            u.inherits(r, i), n.applyEncodingsTo(r), r.fromPubKey = function (e, i) {
                if (i || (i = "livenet"), 33 !== e.length && 65 !== e.length)throw new Error("Invalid public key");
                var n = s[i].addressVersion, o = t.sha256ripe160(e);
                return new r(n, o)
            }, r.fromKey = function (e, t) {
                return r.fromPubKey(e.public, t)
            }, r.fromPubKeys = function (e, t, i, n) {
                i || (i = "livenet");
                for (var s in t) {
                    var u = t[s];
                    if (33 != u.length && 65 != u.length)throw new Error("Invalid public key")
                }
                var a = o.createMultisig(e, t, n);
                return r.fromScript(a, i)
            }, r.fromScript = function (i, n) {
                n || (n = "livenet"), "string" == typeof i && (i = new o(new e(i, "hex")));
                var u = s[n].P2SHVersion, a = i.getBuffer(), f = t.sha256ripe160(a);
                return new r(u, f)
            }, r.fromScriptPubKey = function (i, n) {
                "string" == typeof i && (i = new o(new e(i, "hex"))), n || (n = "livenet");
                var u, a = [], f = i.capture();
                if (f) {
                    var c = i.classify();
                    switch (c) {
                        case o.TX_PUBKEY:
                            f[0] = t.sha256ripe160(f[0]), u = s[n].addressVersion;
                            break;
                        case o.TX_PUBKEYHASH:
                            u = s[n].addressVersion;
                            break;
                        case o.TX_MULTISIG:
                            u = s[n].addressVersion;
                            for (var l in f)f[l] = t.sha256ripe160(f[l]);
                            break;
                        case o.TX_SCRIPTHASH:
                            u = s[n].P2SHVersion
                    }
                    for (var l in f)a.push(new r(u, f[l]))
                }
                return a
            }, r.prototype.validate = function () {
                if (this.doAsBinary(function () {
                        if (r.super_.prototype.validate.apply(this), 21 !== this.data.length)throw new Error("invalid data length")
                    }), "undefined" == typeof this.network())throw new Error("invalid network")
            }, r.prototype.network = function () {
                var e, r = this.version(), t = s.livenet, i = s.testnet;
                return r === t.addressVersion || r === t.P2SHVersion ? e = t : (r === i.addressVersion || r === i.P2SHVersion) && (e = i), e
            }, r.prototype.isScript = function () {
                return this.isValid() && this.version() === this.network().P2SHVersion
            }, r.prototype.getScriptPubKey = function () {
                var e, r = this.version(), t = s.livenet, i = s.testnet;
                if (r === t.addressVersion || r === i.addressVersion)e = o.createPubKeyHashOut(this.payload()); else {
                    if (r !== t.P2SHVersion && r !== i.P2SHVersion)throw new Error("invalid address - unknown version");
                    e = o.createP2SH(this.payload())
                }
                return e
            }, r.fromPubkeyHashScriptSig = function (e, t) {
                return r.fromPubKey(e.chunks[1], t)
            }, r.fromScriptSig = function (t, i) {
                "string" == typeof t && (t = new o(new e(t, "hex"))), i || (i = "livenet");
                t.chunks;
                return 2 === t.chunks.length ? r.fromPubkeyHashScriptSig(t, i) : null
            }, r.getScriptPubKeyFor = function (e) {
                return new r(e).getScriptPubKey()
            }, r.validate = function (e) {
                return new r(e).isValid()
            }, module.exports = r
        }).call(this, require("buffer").Buffer);
    }, {
        "../networks": "ULNIu2",
        "../util": 163,
        "../util/EncodedData": "eLfUFE",
        "../util/VersionedData": "QLzNQg",
        "./Script": "hQ0t76",
        "buffer": 78,
        "util": 111
    }],
    "./lib/Address": [function (require, module, exports) {
        module.exports = require('G+CcXD');
    }, {}],
    "./lib/Armory": [function (require, module, exports) {
        module.exports = require('YL/05i');
    }, {}],
    "YL/05i": [function (require, module, exports) {
        (function (e) {
            function r(r, n) {
                this.chaincode = new e(r, "hex"), this.pubkey = new e(n, "hex")
            }

            function n(e) {
                for (var r = "0123456789abcdef", n = "asdfghjkwertuion", t = "", i = 0; i < e.length; i++)t += r.charAt(n.indexOf(e.charAt(i)));
                return t
            }

            var t = require("./Point"), i = require("./Key"), o = require("../util").sha256, c = require("../util").twoSha256;
            r.prototype.generatePubKey = function () {
                for (var e = this.pubkey, r = this.chaincode, n = c(e), i = 0; 32 > i; i++)n[i] ^= r[i];
                var o = t.fromUncompressedPubKey(e);
                o = t.multiply(o, n);
                var u = o.toUncompressedPubKey();
                return u
            }, r.prototype.next = function () {
                var e = this.generatePubKey();
                return new r(this.chaincode, e)
            }, r.fromMasterPublicKey = function (e) {
                var n = e.substr(0, 130), t = e.substr(130, e.length);
                return new r(t, n)
            }, r.decodeSeed = function (t) {
                for (var i = t.trim().split("\n"), o = [], c = 0; c < i.length; c++) {
                    var u = i[c].replace(" ", ""), a = new e(n(u), "hex"), h = a.slice(0, 16);
                    o.push(h)
                }
                var s = e.concat([o[0], o[1]]), f = 4 == o.length ? e.concat([o[2], o[3]]) : r.deriveChaincode(s);
                return {privKey: s, chainCode: f}
            }, r.fromSeed = function (e) {
                var n = r.decodeSeed(e), t = new i;
                return t.private = n.privKey, t.compressed = !1, t.regenerateSync(), new r(n.chainCode, t.public)
            }, r.deriveChaincode = function (r) {
                for (var n = "Derive Chaincode from Root Key", t = c(r), i = [], u = [], a = 0; a < t.length; a++)i.push(92 ^ t[a]), u.push(54 ^ t[a]);
                i = new e(i), u = new e(u);
                var h = new e(n, "utf8"), s = o(e.concat([u, h])), f = o(e.concat([i, s]));
                return f
            }, module.exports = r
        }).call(this, require("buffer").Buffer);
    }, {"../util": 163, "./Key": "ALJ4PS", "./Point": "6tXgqr", "buffer": 78}],
    "cBnJMk": [function (require, module, exports) {
        (function (r) {
            "use strict";
            var e = require("./Message"), n = require("./ECIES"), t = require("preconditions").singleton(), o = require("./Key"), i = 1, c = 0, a = function () {
            };
            a.setVersion = function (r, e) {
                i = r, c = e
            }, a.encode = function (e, n, u, f) {
                t.checkArgument(n instanceof o, "fromkey"), "string" == typeof e && (e = new r(e, "hex")), u instanceof r || (u = new r(JSON.stringify(u)));
                var s = new r([i]), h = new r([c]);
                if (f && f.nonce && r.isBuffer(f.nonce) && 8 == f.nonce.length)var v = f.nonce; else {
                    var v = new r(8);
                    v.fill(0)
                }
                var w = r.concat([s, h, v, u]), y = new r(w.toString("hex")), d = a._encrypt(e, y), g = a._sign(n, d), p = {
                    pubkey: n.public.toString("hex"),
                    sig: g.toString("hex"),
                    encrypted: d.toString("hex"),
                    to: e.toString("hex")
                };
                return p
            }, a.decode = function (e, n, t) {
                if (t && t.prevnonce && r.isBuffer(t.prevnonce) && 8 == t.prevnonce.length)var o = t.prevnonce; else {
                    var o = new r(8);
                    o.fill(0)
                }
                try {
                    var c = new r(n.pubkey, "hex")
                } catch (u) {
                    throw new Error("Error decoding public key: " + u)
                }
                try {
                    var f = new r(n.sig, "hex"), s = new r(n.encrypted, "hex")
                } catch (u) {
                    throw new Error("Error decoding data: " + u)
                }
                try {
                    var h = a._verify(c, f, s)
                } catch (u) {
                    throw new Error("Error verifying signature: " + u)
                }
                if (!h)throw new Error("Invalid signature");
                try {
                    var v = a._decrypt(e.private, s), w = new r(v.toString(), "hex")
                } catch (u) {
                    throw new Error("Cannot decrypt data: " + u)
                }
                try {
                    var y = w[0], d = w[1], g = w.slice(2, 10), p = w.slice(10)
                } catch (u) {
                    throw new Error("Cannot parse decrypted data: " + u)
                }
                if (0 === p.length)throw new Error("No data present");
                if (y !== i)throw new Error("Invalid version number");
                if (!a._noncegt(g, o) && "0000000000000000" !== o.toString("hex"))throw new Error("Nonce not equal to zero and not greater than the previous nonce");
                try {
                    p = JSON.parse(p)
                } catch (u) {
                    if (!(u instanceof SyntaxError))throw u
                }
                var l = {version1: y, version2: d, nonce: g, payload: p};
                return l
            }, a._noncegt = function (r, e) {
                var n = r.slice(0, 4).readUInt32BE(0), t = e.slice(0, 4).readUInt32BE(0);
                if (n > t)return !0;
                if (t > n)return !1;
                var o = r.slice(4, 8).readUInt32BE(0), i = e.slice(4, 8).readUInt32BE(0);
                return o > i ? !0 : !1
            }, a._encrypt = function (r, e, t, o) {
                var i = n.encrypt(r, e, t, o);
                return i
            }, a._decrypt = function (r, e) {
                var t = n.decrypt(r, e);
                return t
            }, a._sign = function (r, n) {
                var t = e.sign(n, r);
                return t
            }, a._verify = function (r, n, t) {
                var o = e.verifyWithPubKey(r, t, n);
                return o
            }, module.exports = a
        }).call(this, require("buffer").Buffer);
    }, {"./ECIES": "0Qraa1", "./Key": "ALJ4PS", "./Message": "CBDCgz", "buffer": 78, "preconditions": 145}],
    "./lib/AuthMessage": [function (require, module, exports) {
        module.exports = require('cBnJMk');
    }, {}],
    "./lib/Base58": [function (require, module, exports) {
        module.exports = require('6VqyzY');
    }, {}],
    "6VqyzY": [function (require, module, exports) {
        (function (e) {
            function r(r) {
                return new e(t.createHash("sha256").update(r).digest("binary"), "binary")
            }

            function n(e) {
                return r(r(e))
            }

            for (var t = require("crypto"), o = require("bignum"), i = new e(1024), c = new e(0), f = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", u = f[0], a = new e(f, "ascii"), h = {}, d = 0; d < f.length; d++)h[f[d]] = d;
            var l = {
                encode: function (r) {
                    var n, t, c = o.fromBuffer(r);
                    n = r.length < 512 ? i : new e(r.length << 1);
                    for (var f = n.length - 1; c.gt(0);)t = c.mod(58), c = c.div(58), n[f] = a[t.toNumber()], f--;
                    for (var u = 0; 0 == r[u];)n[f] = a[0], u++, f--;
                    return n.slice(f + 1, n.length).toString("ascii")
                }, decode: function (r) {
                    if (0 == r.length)return c;
                    for (var n = o(0), t = 0; t < r.length; t++)n = n.mul(58), n = n.add(h[r[t]]);
                    for (var t = 0; t < r.length && r[t] == u;)t++;
                    if (t > 0) {
                        var i = new e(t);
                        return i.fill(0), t == r.length ? i : (n = n.toBuffer(), e.concat([i, n], t + n.length))
                    }
                    return n.toBuffer()
                }
            }, s = {
                encode: function (r) {
                    var t = new e(r.length + 4), o = n(r);
                    return r.copy(t), o.copy(t, r.length), l.encode(t)
                }, decode: function (e) {
                    var r = l.decode(e);
                    if (r.length < 4)throw new Error("invalid input: too short");
                    var t = r.slice(0, -4), o = r.slice(-4), i = n(t), c = i.slice(0, 4);
                    if (o.toString("hex") !== c.toString("hex"))throw new Error("checksum mismatch");
                    return t
                }
            };
            exports.setBuffer = function (e) {
                i = e
            }, exports.base58 = l, exports.base58Check = s, exports.encode = l.encode, exports.decode = l.decode
        }).call(this, require("buffer").Buffer);
    }, {"bignum": 49, "buffer": 78, "crypto": 82}],
    "./lib/Block": [function (require, module, exports) {
        module.exports = require('pJEQEB');
    }, {}],
    "pJEQEB": [function (require, module, exports) {
        (function (t) {
            function e(t) {
                "object" != typeof t && (t = {}), this.hash = t.hash || null, this.prev_hash = t.prev_hash || r.NULL_HASH, this.merkle_root = t.merkle_root || r.NULL_HASH, this.timestamp = t.timestamp || 0, this.bits = t.bits || 0, this.nonce = t.nonce || 0, this.version = t.version || 0, this.height = t.height || 0, this.size = t.size || 0, this.active = t.active || !1, this.chainWork = t.chainWork || r.EMPTY_BUFFER, this.txs = t.txs || []
            }

            var r = require("../util"), i = require("./Script"), o = require("bignum"), s = (require("binary"), require("step"), require("buffertools")), h = require("./Transaction"), n = h.In, a = h.Out, c = h.COINBASE_OP, u = require("../util/error").VerificationError, l = {
                maxTimeOffset: 7200,
                largestHash: new o("10000000000000000000000000000000000000000000000000000000000000000", 16)
            };
            e.prototype.getHeader = function () {
                var e = new t(80), r = 0;
                return e.writeUInt32LE(this.version, r), r += 4, this.prev_hash.copy(e, r), r += 32, this.merkle_root.copy(e, r), r += 32, e.writeUInt32LE(this.timestamp, r), r += 4, e.writeUInt32LE(this.bits, r), r += 4, e.writeUInt32LE(this.nonce, r), r += 4, e
            }, e.prototype.parse = function (t, e) {
                if (this.version = t.word32le(), this.prev_hash = t.buffer(32), this.merkle_root = t.buffer(32), this.timestamp = t.word32le(), this.bits = t.word32le(), this.nonce = t.word32le(), this.txs = [], this.size = 0, !e)for (var r = t.varInt(), i = 0; r > i; i++) {
                    var o = new h;
                    o.parse(t), this.txs.push(o)
                }
            }, e.prototype.calcHash = function () {
                var t = this.getHeader();
                return r.twoSha256(t)
            }, e.prototype.checkHash = function () {
                return this.hash && this.hash.length ? 0 == s.compare(this.calcHash(), this.hash) : !1
            }, e.prototype.getHash = function () {
                return this.hash && this.hash.length || (this.hash = this.calcHash()), this.hash
            }, e.prototype.checkProofOfWork = function () {
                var t = r.decodeDiffBits(this.bits), e = s.reverse(this.hash);
                if (s.compare(e, t) > 0)throw new u("Difficulty target not met");
                return !0
            }, e.prototype.getWork = function () {
                var t = r.decodeDiffBits(this.bits, !0);
                return l.largestHash.div(t.add(1))
            }, e.prototype.checkTimestamp = function () {
                var t = (new Date).getTime() / 1e3;
                if (this.timestamp > t + l.maxTimeOffset)throw new u("Timestamp too far into the future");
                return !0
            }, e.prototype.checkTransactions = function (t) {
                if (!Array.isArray(t) || t.length <= 0)throw new u("No transactions");
                if (!t[0].isCoinBase())throw new u("First tx must be coinbase");
                for (var e = 1; e < t.length; e++)if (t[e].isCoinBase())throw new u("Tx index " + e + " must not be coinbase");
                return !0
            }, e.prototype.getMerkleTree = function (e) {
                if (0 == e.length)return [r.NULL_HASH.slice(0)];
                for (var i = e.map(function (t) {
                    return t instanceof h ? t.getHash() : t
                }), o = 0, s = e.length; s > 1; s = Math.floor((s + 1) / 2)) {
                    for (var n = 0; s > n; n += 2) {
                        var a = Math.min(n + 1, s - 1), c = i[o + n], u = i[o + a];
                        i.push(r.twoSha256(t.concat([c, u])))
                    }
                    o += s
                }
                return i
            }, e.prototype.calcMerkleRoot = function (t) {
                var e = this.getMerkleTree(t);
                return e[e.length - 1]
            }, e.prototype.checkMerkleRoot = function (e) {
                if (!this.merkle_root || !this.merkle_root.length)throw new u("No merkle root");
                if (0 !== s.compare(this.calcMerkleRoot(e), new t(this.merkle_root)))throw new u("Merkle root incorrect");
                return !0
            }, e.prototype.checkBlock = function (t) {
                if (!this.checkHash())throw new u("Block hash invalid");
                if (this.checkProofOfWork(), this.checkTimestamp(), t && (this.checkTransactions(t), !this.checkMerkleRoot(t)))throw new u("Merkle hash invalid");
                return !0
            }, e.getBlockValue = function (t) {
                var e = 50 * r.COIN;
                return e /= Math.pow(2, Math.floor(t / 21e4)), e = Math.floor(e), e = new o(e)
            }, e.prototype.getBlockValue = function () {
                return e.getBlockValue(this.height)
            }, e.prototype.toString = function () {
                return "<Block " + r.formatHashAlt(this.hash) + " height=" + this.height + ">"
            }, e.prototype.createCoinbaseTx = function (t) {
                var e = new h;
                return e.ins.push(new n({
                    s: r.EMPTY_BUFFER,
                    q: 4294967295,
                    o: c
                })), e.outs.push(new a({
                    v: r.bigIntToValue(this.getBlockValue()),
                    s: i.createPubKeyOut(t).getBuffer()
                })), e
            }, e.prototype.solve = function (t, e) {
                var i = this.getHeader(), o = r.decodeDiffBits(this.bits);
                t.solve(i, o, e)
            }, e.prototype.getStandardizedObject = function (t) {
                var e = {
                    hash: r.formatHashFull(this.getHash()),
                    version: this.version,
                    prev_block: r.formatHashFull(this.prev_hash),
                    mrkl_root: r.formatHashFull(this.merkle_root),
                    time: this.timestamp,
                    bits: this.bits,
                    nonce: this.nonce,
                    height: this.height
                };
                if (t) {
                    var i = this.getMerkleTree(t).map(function (t) {
                        return r.formatHashFull(t)
                    });
                    e.mrkl_root = i[i.length - 1], e.n_tx = t.length;
                    var o = 80;
                    o += r.getVarIntSize(t.length), t = t.map(function (t) {
                        return t = t.getStandardizedObject(), o += t.size, t
                    }), e.size = o, e.tx = t, e.mrkl_tree = i
                } else e.size = this.size;
                return e
            }, module.exports = e
        }).call(this, require("buffer").Buffer);
    }, {
        "../util": 163,
        "../util/error": 162,
        "./Script": "hQ0t76",
        "./Transaction": "LJhYtm",
        "bignum": 49,
        "binary": 66,
        "buffer": 78,
        "buffertools": "fugeBw",
        "step": 150
    }],
    "./lib/Bloom": [function (require, module, exports) {
        module.exports = require('KifRG4');
    }, {}],
    "KifRG4": [function (require, module, exports) {
        function Bloom() {
            this.data = "", this.hashFuncs = 0
        }

        function ROTL32(t, n) {
            return t << n | t >> 32 - n
        }

        function getBlockU32(t, n) {
            var o = 4 * t, s = n[o + 0] << 0 | n[o + 1] << 8 | n[o + 2] << 16 | n[o + 3] << 24;
            return s
        }

        function toInt(t) {
            return ~~t
        }

        function min(t, n) {
            return n > t ? t : n
        }

        var MAX_BLOOM_FILTER_SIZE = 36e3, MAX_HASH_FUNCS = 50, LN2SQUARED = .48045301391820144, LN2 = .6931471805599453, bit_mask = [1, 2, 4, 8, 16, 32, 64, 128];
        Bloom.prototype.hash = function (t, n) {
            for (var o = t * (4294967295 / (this.hashFuncs - 1)), s = 3432918353, a = 461845907, h = n.length / 4, i = -h; i; i++) {
                var r = getBlockU32(i);
                r *= s, r = ROTLF32(r, 15), r *= a, o ^= r, o = ROTFL(o, 13), o = 5 * o + 3864292196
            }
            var e = n.slice(4 * h), r = 0;
            switch (3 & n.length) {
                case 3:
                    r ^= e[2] << 16;
                case 2:
                    r ^= e[1] << 8;
                case 1:
                    r ^= e[0], r *= s, r = ROTL32(r, 15), r *= a, o ^= r
            }
            return o ^= n.length, o ^= o >> 16, o *= 2246822507, o ^= o >> 13, o *= 3266489909, o ^= o >> 16, o % (8 * this.data.length)
        }, Bloom.prototype.insert = function (t) {
            for (var n = 0; n < this.hashFuncs; n++) {
                var o = this.hash(n, t);
                this.data[o >> 3] |= bit_mask[7 & o]
            }
        }, Bloom.prototype.contains = function (t) {
            for (var n = 0; n < this.hashFuncs; n++) {
                var o = this.hash(n, t);
                if (!(this.data[o >> 3] & bit_mask[7 & o]))return !1
            }
            return !0
        }, Bloom.prototype.sizeOk = function () {
            return this.data.length <= MAX_BLOOM_FILTER_SIZE && this.hashFuncs <= MAX_HASH_FUNCS
        }, Bloom.prototype.init = function (t, n) {
            var o = min(toInt(-1 / LN2SQUARED * t * Math.log(n)), 8 * MAX_BLOOM_FILTER_SIZE) / 8;
            this.data[o] = 0, this.hashFuncs = min(toInt(8 * this.data.length / t * LN2), MAX_HASH_FUNCS)
        }, module.exports = Bloom;
    }, {}],
    "ez/meX": [function (require, module, exports) {
        exports.intFromCompact = function (r) {
            var t = (r >>> 24 & 255) >>> 0, n = (16777215 & r) << 8 * (t - 3) >>> 0;
            return n
        };
    }, {}],
    "./lib/Deserialize": [function (require, module, exports) {
        module.exports = require('ez/meX');
    }, {}],
    "./lib/Electrum": [function (require, module, exports) {
        module.exports = require('hdzBvq');
    }, {}],
    "hdzBvq": [function (require, module, exports) {
        (function (e) {
            function r(r) {
                this.mpk = new e(r, "hex")
            }

            var t = require("./Key"), u = require("./Point"), n = require("../util").twoSha256, i = (require("buffertools"), require("bignum"));
            r.prototype.getSequence = function (r, t) {
                var u = r ? 1 : 0, o = e.concat([new e(t + ":" + u + ":", "utf8"), this.mpk]);
                return i.fromBuffer(n(o))
            }, r.prototype.generatePubKey = function (r, n) {
                var o = i.fromBuffer(this.mpk.slice(0, 32), {size: 32}), f = i.fromBuffer(this.mpk.slice(32, 64), {size: 32}), c = new u(o, f), p = this.getSequence(n, r), s = new t;
                s.private = p.toBuffer(), s.regenerateSync(), s.compressed = !1;
                var a = u.fromUncompressedPubKey(s.public);
                pt = u.add(c, a);
                var m = pt.x.toBuffer({size: 32}), b = pt.y.toBuffer({size: 32}), h = new e([4]), l = new t;
                return l.compressed = !1, l.public = e.concat([h, m, b]), l.public
            }, r.prototype.generateChangePubKey = function (e) {
                return this.generatePubKey(e, !0)
            }, module.exports = r
        }).call(this, require("buffer").Buffer);
    }, {"../util": 163, "./Key": "ALJ4PS", "./Point": "6tXgqr", "bignum": 49, "buffer": 78, "buffertools": "fugeBw"}],
    "x1O6JW": [function (require, module, exports) {
        (function (e) {
            function i(e, i) {
                if (e.length < i)throw new Error("not enough data");
                for (var t = 0, n = 0; i > n; n++)t *= 256, t += e[n];
                return t
            }

            function t(e) {
                return i(e, 1)
            }

            function n(e) {
                return i(e, 4)
            }

            var r = require("./Base58").base58, s = require("../util"), h = require("./Key"), a = require("./Point"), c = require("./SecureRandom"), o = require("bignum"), d = require("../networks"), l = new o("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 16), u = (new o("79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", 16), function (i) {
                if ("undefined" == typeof i || "mainnet" == i || "livenet" == i ? (i = "livenet", this.version = d.livenet.hkeyPrivateVersion) : "testnet" == i && (this.version = d.testnet.hkeyPrivateVersion), "livenet" == i || "testnet" == i)return this.depth = 0, this.parentFingerprint = new e([0, 0, 0, 0]), this.childIndex = new e([0, 0, 0, 0]), this.chainCode = c.getRandomBuffer(32), this.eckey = h.generateSync(), this.hasPrivateKey = !0, this.pubKeyHash = s.sha256ripe160(this.eckey.public), this.buildExtendedPublicKey(), void this.buildExtendedPrivateKey();
                if ("string" == typeof i) {
                    var t = r.decode(i);
                    if (82 != t.length)throw new Error("Not enough data, expected 82 and received " + t.length);
                    var n = t.slice(78, 82);
                    i = t.slice(0, 78);
                    var a = s.sha256(s.sha256(i));
                    if (a[0] != n[0] || a[1] != n[1] || a[2] != n[2] || a[3] != n[3])throw new Error("Invalid checksum")
                }
                void 0 !== i && null !== i && this.initFromBytes(i)
            });
            u.seed = function (i, t) {
                if (t || (t = "livenet"), e.isBuffer(i) || (i = new e(i, "hex")), i.length < 16)return !1;
                if (i.length > 64)return !1;
                var n = s.sha512hmac(i, new e("Bitcoin seed")), r = new u(null);
                return r.depth = 0, r.parentFingerprint = new e([0, 0, 0, 0]), r.childIndex = new e([0, 0, 0, 0]), r.chainCode = n.slice(32, 64), r.version = d[t].hkeyPrivateVersion, r.eckey = new h, r.eckey.private = n.slice(0, 32), r.eckey.regenerateSync(), r.hasPrivateKey = !0, r.pubKeyHash = s.sha256ripe160(r.eckey.public), r.buildExtendedPublicKey(), r.buildExtendedPrivateKey(), r
            }, u.prototype.initFromBytes = function (e) {
                if (78 != e.length)throw new Error("not enough data");
                this.version = n(e.slice(0, 4)), this.depth = t(e.slice(4, 5)), this.parentFingerprint = e.slice(5, 9), this.childIndex = n(e.slice(9, 13)), this.chainCode = e.slice(13, 45);
                var i = e.slice(45, 78), r = this.version == d.livenet.hkeyPrivateVersion || this.version == d.testnet.hkeyPrivateVersion, a = this.version == d.livenet.hkeyPublicVersion || this.version == d.testnet.hkeyPublicVersion;
                if (r && 0 == i[0])this.eckey = new h, this.eckey.private = i.slice(1, 33), this.eckey.compressed = !0, this.eckey.regenerateSync(), this.pubKeyHash = s.sha256ripe160(this.eckey.public), this.hasPrivateKey = !0; else {
                    if (!a || 2 != i[0] && 3 != i[0])throw new Error("Invalid key");
                    this.eckey = new h, this.eckey.public = i, this.pubKeyHash = s.sha256ripe160(this.eckey.public), this.hasPrivateKey = !1
                }
                this.buildExtendedPublicKey(), this.buildExtendedPrivateKey()
            }, u.prototype.buildExtendedPublicKey = function () {
                this.extendedPublicKey = new e([]);
                var i = null;
                switch (this.version) {
                    case d.livenet.hkeyPublicVersion:
                    case d.livenet.hkeyPrivateVersion:
                        i = d.livenet.hkeyPublicVersion;
                        break;
                    case d.testnet.hkeyPublicVersion:
                    case d.testnet.hkeyPrivateVersion:
                        i = d.testnet.hkeyPublicVersion;
                        break;
                    default:
                        throw new Error("Unknown version")
                }
                this.extendedPublicKey = e.concat([new e([i >> 24]), new e([i >> 16 & 255]), new e([i >> 8 & 255]), new e([255 & i]), new e([this.depth]), this.parentFingerprint, new e([this.childIndex >>> 24]), new e([this.childIndex >>> 16 & 255]), new e([this.childIndex >>> 8 & 255]), new e([255 & this.childIndex]), this.chainCode, this.eckey.public])
            }, u.prototype.extendedPublicKeyString = function (i) {
                if (void 0 === i || "base58" === i) {
                    var t = s.sha256(s.sha256(this.extendedPublicKey)), n = t.slice(0, 4), h = e.concat([this.extendedPublicKey, n]);
                    return r.encode(h)
                }
                if ("hex" === i)return this.extendedPublicKey.toString("hex");
                throw new Error("bad format")
            }, u.prototype.buildExtendedPrivateKey = function () {
                if (this.hasPrivateKey) {
                    this.extendedPrivateKey = new e([]);
                    var i = this.version;
                    this.extendedPrivateKey = e.concat([new e([i >> 24]), new e([i >> 16 & 255]), new e([i >> 8 & 255]), new e([255 & i]), new e([this.depth]), this.parentFingerprint, new e([this.childIndex >>> 24]), new e([this.childIndex >>> 16 & 255]), new e([this.childIndex >>> 8 & 255]), new e([255 & this.childIndex]), this.chainCode, new e([0]), this.eckey.private])
                }
            }, u.prototype.extendedPrivateKeyString = function (i) {
                if (void 0 === i || "base58" === i) {
                    var t = s.sha256(s.sha256(this.extendedPrivateKey)), n = t.slice(0, 4), h = e.concat([this.extendedPrivateKey, n]);
                    return r.encode(h)
                }
                if ("hex" === i)return this.extendedPrivateKey.toString("hex");
                throw new Error("bad format")
            }, u.prototype.derive = function (e) {
                var i = e.split("/");
                if ("m" == e || "M" == e || "m'" == e || "M'" == e)return this;
                var t = this;
                for (var n in i) {
                    var r = i[n];
                    if (0 != n) {
                        var s = r.length > 1 && "'" == r[r.length - 1], h = 2147483647 & parseInt(s ? r.slice(0, r.length - 1) : r);
                        s && (h += 2147483648), t = t.deriveChild(h)
                    } else if ("m" != r)throw new Error("invalid path")
                }
                return t
            }, u.prototype.deriveChild = function (i) {
                var t = [];
                t.push(i >> 24 & 255), t.push(i >> 16 & 255), t.push(i >> 8 & 255), t.push(255 & i), t = new e(t);
                var n = 0 != (2147483648 & i), r = this.version == d.livenet.hkeyPrivateVersion || this.version == d.testnet.hkeyPrivateVersion;
                if (n && (!this.hasPrivateKey || !r))throw new Error("Cannot do private key derivation without private key");
                var c = null;
                if (this.hasPrivateKey) {
                    var y = null;
                    y = e.concat(n ? [new e([0]), this.eckey.private, t] : [this.eckey.public, t]);
                    var v = s.sha512hmac(y, this.chainCode), p = o.fromBuffer(v.slice(0, 32), {size: 32}), w = v.slice(32, 64), b = o.fromBuffer(this.eckey.private, {size: 32}), f = p.add(b).mod(l);
                    c = new u(null), c.chainCode = w, c.eckey = new h, c.eckey.private = f.toBuffer({size: 32}), c.eckey.regenerateSync(), c.hasPrivateKey = !0
                } else {
                    var y = e.concat([this.eckey.public, t]), v = s.sha512hmac(y, this.chainCode), p = v.slice(0, 32), w = v.slice(32, 64), k = new h;
                    k.private = p, k.regenerateSync(), k.compressed = !1;
                    var P = a.fromUncompressedPubKey(k.public), F = new h;
                    F.public = this.eckey.public, F.compressed = !1;
                    var x = a.fromUncompressedPubKey(F.public), K = a.add(P, x).toUncompressedPubKey();
                    c = new u(null), c.chainCode = new e(w);
                    var g = new h;
                    g.public = K, g.compressed = !0, c.eckey = g, c.hasPrivateKey = !1
                }
                return c.childIndex = i, c.parentFingerprint = this.pubKeyHash.slice(0, 4), c.version = this.version, c.depth = this.depth + 1, c.eckey.compressed = !0, c.pubKeyHash = s.sha256ripe160(c.eckey.public), c.buildExtendedPublicKey(), c.buildExtendedPrivateKey(), c
            }, module.exports = u
        }).call(this, require("buffer").Buffer);
    }, {
        "../networks": "ULNIu2",
        "../util": 163,
        "./Base58": "6VqyzY",
        "./Key": "ALJ4PS",
        "./Point": "6tXgqr",
        "./SecureRandom": "p4SiC2",
        "bignum": 49,
        "buffer": 78
    }],
    "./lib/HierarchicalKey": [function (require, module, exports) {
        module.exports = require('x1O6JW');
    }, {}],
    "CBDCgz": [function (require, module, exports) {
        (function (e) {
            "use strict";
            var r = require("../util"), i = require("./Key"), n = require("bignum"), r = require("../util"), t = function () {
            };
            t.sign = function (e, r) {
                var i = t.magicHash(e), n = r.signSync(i);
                return n
            }, t.verifyWithPubKey = function (e, r, n) {
                var u = t.magicHash(r), a = new i;
                return 65 == e.length && (a.compressed = !1), a.public = e, a.verifySignatureSync(u, n)
            }, t.signMessage = function (e, r) {
                var u = t.magicHash(e), a = n.fromBuffer(r.private), s = i.signCompressed(u, a);
                return s
            }, t.verifyMessage = function (e, r, n) {
                var u = t.magicHash(r);
                return i.verifyCompressed(u, n, e)
            }, t.magicBytes = new e("Bitcoin Signed Message:\n"), t.magicHash = function (i) {
                var n = t.magicBytes, u = r.varIntBuf(n.length), a = new e(i), s = r.varIntBuf(a.length), c = e.concat([u, n, s, a]), f = r.twoSha256(c);
                return f
            }, module.exports = t
        }).call(this, require("buffer").Buffer);
    }, {"../util": 163, "./Key": "ALJ4PS", "bignum": 49, "buffer": 78}],
    "./lib/Message": [function (require, module, exports) {
        module.exports = require('CBDCgz');
    }, {}],
    "Zm7/h9": [function (require, module, exports) {
        function Opcode(O) {
            this.code = O
        }

        Opcode.prototype.toString = function () {
            return Opcode.reverseMap[this.code]
        }, Opcode.map = {
            OP_FALSE: 0,
            OP_0: 0,
            OP_PUSHDATA1: 76,
            OP_PUSHDATA2: 77,
            OP_PUSHDATA4: 78,
            OP_1NEGATE: 79,
            OP_RESERVED: 80,
            OP_TRUE: 81,
            OP_1: 81,
            OP_2: 82,
            OP_3: 83,
            OP_4: 84,
            OP_5: 85,
            OP_6: 86,
            OP_7: 87,
            OP_8: 88,
            OP_9: 89,
            OP_10: 90,
            OP_11: 91,
            OP_12: 92,
            OP_13: 93,
            OP_14: 94,
            OP_15: 95,
            OP_16: 96,
            OP_NOP: 97,
            OP_VER: 98,
            OP_IF: 99,
            OP_NOTIF: 100,
            OP_VERIF: 101,
            OP_VERNOTIF: 102,
            OP_ELSE: 103,
            OP_ENDIF: 104,
            OP_VERIFY: 105,
            OP_RETURN: 106,
            OP_TOALTSTACK: 107,
            OP_FROMALTSTACK: 108,
            OP_2DROP: 109,
            OP_2DUP: 110,
            OP_3DUP: 111,
            OP_2OVER: 112,
            OP_2ROT: 113,
            OP_2SWAP: 114,
            OP_IFDUP: 115,
            OP_DEPTH: 116,
            OP_DROP: 117,
            OP_DUP: 118,
            OP_NIP: 119,
            OP_OVER: 120,
            OP_PICK: 121,
            OP_ROLL: 122,
            OP_ROT: 123,
            OP_SWAP: 124,
            OP_TUCK: 125,
            OP_CAT: 126,
            OP_SUBSTR: 127,
            OP_LEFT: 128,
            OP_RIGHT: 129,
            OP_SIZE: 130,
            OP_INVERT: 131,
            OP_AND: 132,
            OP_OR: 133,
            OP_XOR: 134,
            OP_EQUAL: 135,
            OP_EQUALVERIFY: 136,
            OP_RESERVED1: 137,
            OP_RESERVED2: 138,
            OP_1ADD: 139,
            OP_1SUB: 140,
            OP_2MUL: 141,
            OP_2DIV: 142,
            OP_NEGATE: 143,
            OP_ABS: 144,
            OP_NOT: 145,
            OP_0NOTEQUAL: 146,
            OP_ADD: 147,
            OP_SUB: 148,
            OP_MUL: 149,
            OP_DIV: 150,
            OP_MOD: 151,
            OP_LSHIFT: 152,
            OP_RSHIFT: 153,
            OP_BOOLAND: 154,
            OP_BOOLOR: 155,
            OP_NUMEQUAL: 156,
            OP_NUMEQUALVERIFY: 157,
            OP_NUMNOTEQUAL: 158,
            OP_LESSTHAN: 159,
            OP_GREATERTHAN: 160,
            OP_LESSTHANOREQUAL: 161,
            OP_GREATERTHANOREQUAL: 162,
            OP_MIN: 163,
            OP_MAX: 164,
            OP_WITHIN: 165,
            OP_RIPEMD160: 166,
            OP_SHA1: 167,
            OP_SHA256: 168,
            OP_HASH160: 169,
            OP_HASH256: 170,
            OP_CODESEPARATOR: 171,
            OP_CHECKSIG: 172,
            OP_CHECKSIGVERIFY: 173,
            OP_CHECKMULTISIG: 174,
            OP_CHECKMULTISIGVERIFY: 175,
            OP_NOP1: 176,
            OP_NOP2: 177,
            OP_NOP3: 178,
            OP_NOP4: 179,
            OP_NOP5: 180,
            OP_NOP6: 181,
            OP_NOP7: 182,
            OP_NOP8: 183,
            OP_NOP9: 184,
            OP_NOP10: 185,
            OP_PUBKEYHASH: 253,
            OP_PUBKEY: 254,
            OP_INVALIDOPCODE: 255
        }, Opcode.reverseMap = [];
        for (var k in Opcode.map)Opcode.map.hasOwnProperty(k) && (Opcode.reverseMap[Opcode.map[k]] = k.substr(3));
        Opcode.asList = function () {
            var O = [];
            for (var P in Opcode.map)Opcode.map.hasOwnProperty(P) && O.push(P);
            return O
        }, module.exports = Opcode;
    }, {}],
    "./lib/Opcode": [function (require, module, exports) {
        module.exports = require('Zm7/h9');
    }, {}],
    "izTl9z": [function (require, module, exports) {
        (function (t) {
            function i(t, e, r) {
                i.super_.call(this, t, e), void 0 !== r && this.compressed(r)
            }

            var e = require("../util/VersionedData"), r = require("../util/EncodedData"), n = require("../networks"), a = require("util");
            a.inherits(i, e), r.applyEncodingsTo(i), i.prototype.validate = function () {
                if (this.doAsBinary(function () {
                        if (i.super_.prototype.validate.call(this), this.data.length < 32 || this.data.length > 33 && !this.compressed() || 34 == this.data.length && 1 != this.data[33] || this.data.length > 34)throw new Error("invalid data length")
                    }), "undefined" == typeof this.network())throw new Error("invalid network")
            }, i.prototype.payload = function (t) {
                if (t)return this.doAsBinary(function () {
                    t.copy(this.data, 1)
                }), t;
                var i = this.as("binary");
                return 34 == i.length ? i.slice(1, 33) : 33 == i.length ? i.slice(1) : void 0
            }, i.prototype.compressed = function (i) {
                if (void 0 === i) {
                    var e = 34, r = this.as("binary");
                    if (r.length == e && 1 == r[e - 1])return !0;
                    if (r.length == e - 1)return !1;
                    throw new Error("invalid private key")
                }
                this.doAsBinary(function () {
                    var e = 34;
                    if (i) {
                        var r = new t(e);
                        this.data.copy(r), this.data = r, this.data[e - 1] = 1
                    } else this.data = this.data.slice(0, e - 1)
                })
            }, i.prototype.network = function () {
                var t, i = this.version(), e = n.livenet, r = n.testnet;
                return i === e.privKeyVersion ? t = e : i === r.privKeyVersion && (t = r), t
            }, module.exports = i
        }).call(this, require("buffer").Buffer);
    }, {
        "../networks": "ULNIu2",
        "../util/EncodedData": "eLfUFE",
        "../util/VersionedData": "QLzNQg",
        "buffer": 78,
        "util": 111
    }],
    "./lib/PrivateKey": [function (require, module, exports) {
        module.exports = require('izTl9z');
    }, {}],
    "./lib/RpcClient": [function (require, module, exports) {
        module.exports = require('7siE1N');
    }, {}],
    "7siE1N": [function (require, module, exports) {
        (function (t) {
            function e(t) {
                t = t || {}, this.host = t.host || "127.0.0.1", this.port = t.port || 8332, this.user = t.user || "user", this.pass = t.pass || "pass", this.protocol = "http" == t.protocol ? n : o, this.batchedCalls = null, this.disableAgent = t.disableAgent || !1
            }

            function r(t, e, r) {
                function s(t, e) {
                    return function () {
                        var s = arguments.length - 1;
                        if (this.batchedCalls)var s = arguments.length;
                        for (var n = 0; s > n; n++)e[n] && (arguments[n] = e[n](arguments[n]));
                        this.batchedCalls ? this.batchedCalls.push({
                            jsonrpc: "2.0",
                            method: t,
                            params: l(arguments)
                        }) : r.call(this, {
                            method: t,
                            params: l(arguments, 0, arguments.length - 1)
                        }, arguments[arguments.length - 1])
                    }
                }

                var n = {
                    str: function (t) {
                        return t.toString()
                    }, "int": function (t) {
                        return parseFloat(t)
                    }, "float": function (t) {
                        return parseFloat(t)
                    }, bool: function (t) {
                        return t === !0 || "1" == t || "true" == t || "true" == t.toString().toLowerCase()
                    }
                };
                for (var o in e)if (e.hasOwnProperty(o)) {
                    for (var i = e[o].split(" "), a = 0; a < i.length; a++)i[a] = n[i[a]] ? n[i[a]] : n.string;
                    var c = o.toLowerCase();
                    t.prototype[o] = s(c, i), t.prototype[c] = t.prototype[o]
                }
            }

            function s(e, r) {
                var e, s = this;
                e = JSON.stringify(e);
                var n = t(s.user + ":" + s.pass).toString("base64"), o = {
                    host: s.host,
                    path: "/",
                    method: "POST",
                    port: s.port,
                    agent: s.disableAgent ? !1 : void 0
                };
                if (s.httpOptions)for (var a in s.httpOptions)o[a] = s.httpOptions[a];
                var l = null, c = this.protocol.request(o, function (t) {
                    var e = "";
                    t.on("data", function (t) {
                        e += t
                    }), t.on("end", function () {
                        if (401 == t.statusCode)return void r(new Error("bitcoin JSON-RPC connection rejected: 401 unauthorized"));
                        if (403 == t.statusCode)return void r(new Error("bitcoin JSON-RPC connection rejected: 403 forbidden"));
                        if (l)return void r(l);
                        try {
                            var s = JSON.parse(e)
                        } catch (n) {
                            return i.err(n.stack), i.err(e), i.err("HTTP Status code:" + t.statusCode), void r(n)
                        }
                        r(s.error, s)
                    })
                });
                c.on("error", function (t) {
                    var e = new Error("Could not connect to bitcoin via RPC: " + t.message);
                    i.err(e), r(e)
                }), c.setHeader("Content-Length", e.length), c.setHeader("Content-Type", "application/json"), c.setHeader("Authorization", "Basic " + n), c.write(e), c.end()
            }

            var n = require("http"), o = require("https"), i = require("../util/log");
            e.prototype.batch = function (t, e) {
                this.batchedCalls = [], t(), s.call(this, this.batchedCalls, e), this.batchedCalls = null
            };
            var a = {
                addMultiSigAddress: "",
                addNode: "",
                backupWallet: "",
                createMultiSig: "",
                createRawTransaction: "",
                decodeRawTransaction: "",
                dumpPrivKey: "",
                encryptWallet: "",
                getAccount: "",
                getAccountAddress: "str",
                getAddedNodeInfo: "",
                getAddressesByAccount: "",
                getBalance: "str int",
                getBestBlockHash: "",
                getBlock: "",
                getBlockCount: "",
                getBlockHash: "int",
                getBlockNumber: "",
                getBlockTemplate: "",
                getConnectionCount: "",
                getDifficulty: "",
                getGenerate: "",
                getHashesPerSec: "",
                getInfo: "",
                getMemoryPool: "",
                getMiningInfo: "",
                getNewAddress: "",
                getPeerInfo: "",
                getRawMemPool: "",
                getRawTransaction: "str int",
                getReceivedByAccount: "str int",
                getReceivedByAddress: "str int",
                getTransaction: "",
                getTxOut: "str int bool",
                getTxOutSetInfo: "",
                getWork: "",
                help: "",
                importAddress: "str str bool",
                importPrivKey: "str str bool",
                keyPoolRefill: "",
                listAccounts: "int",
                listAddressGroupings: "",
                listReceivedByAccount: "int bool",
                listReceivedByAddress: "int bool",
                listSinceBlock: "str int",
                listTransactions: "str int int",
                listUnspent: "int int",
                listLockUnspent: "bool",
                lockUnspent: "",
                move: "str str float int str",
                sendFrom: "str str float int str str",
                sendMany: "str str int str",
                sendRawTransaction: "",
                sendToAddress: "str float str str",
                setAccount: "",
                setGenerate: "bool int",
                setTxFee: "float",
                signMessage: "",
                signRawTransaction: "",
                stop: "",
                submitBlock: "",
                validateAddress: "",
                verifyMessage: "",
                walletLock: "",
                walletPassPhrase: "string int",
                walletPassphraseChange: ""
            }, l = function (t, e, r) {
                return Array.prototype.slice.call(t, e, r)
            };
            r(e, a, s), module.exports = e
        }).call(this, require("buffer").Buffer);
    }, {"../util/log": "AdF7pF", "buffer": 78, "http": 89, "https": 93}],
    "./lib/SIN": [function (require, module, exports) {
        module.exports = require('tBM27q');
    }, {}],
    "tBM27q": [function (require, module, exports) {
        (function (t) {
            "use strict";
            function i(n, r) {
                if ("number" != typeof n)return void i.super_.call(this, n, r);
                if (!t.isBuffer(r) || 20 != r.length)throw new Error("Payload must be 20 bytes");
                this.data = new t(2 + r.length), this.converters = this.encodings.binary.converters, this._encoding = this.encodings.binary._encoding, this.encoding("binary"), this.prefix(15), this.type(n), this.payload(r)
            }

            var n = require("../util/VersionedData"), r = require("../util/EncodedData"), e = require("util"), o = require("../util");
            e.inherits(i, n), r.applyEncodingsTo(i), i.SIN_PERSIST_MAINNET = 1, i.SIN_PERSIST_TESTNET = 17, i.SIN_EPHEM = 2, i.prototype.prefix = function (t) {
                return t || 0 === t ? (this.doAsBinary(function () {
                    this.data.writeUInt8(t, 0)
                }), t) : this.as("binary").readUInt8(0)
            }, i.prototype.type = function (t) {
                return t || 0 === t ? (this.doAsBinary(function () {
                    this.data.writeUInt8(t, 1)
                }), t) : this.as("binary").readUInt8(1)
            }, i.prototype.payload = function (t) {
                return t ? (this.doAsBinary(function () {
                    t.copy(this.data, 2)
                }), t) : this.as("binary").slice(1)
            }, i.prototype.validate = function () {
                this.doAsBinary(function () {
                    if (i.super_.prototype.validate.call(this), 22 != this.data.length)throw new Error("invalid data length")
                })
            }, i.fromPubKey = function (n, r) {
                if (r || (r = i.SIN_EPHEM), !t.isBuffer(n) || 33 !== n.length && 65 != n.length)throw new Error("Invalid public key");
                var e = o.sha256ripe160(n);
                return new i(e, r)
            }, module.exports = i
        }).call(this, require("buffer").Buffer);
    }, {"../util": 163, "../util/EncodedData": "eLfUFE", "../util/VersionedData": "QLzNQg", "buffer": 78, "util": 111}],
    "./lib/SINKey": [function (require, module, exports) {
        module.exports = require('EyghZQ');
    }, {}],
    "EyghZQ": [function (require, module, exports) {
        function SINKey(e) {
            "object" != typeof e && (e = {}), this.created = e.created, this.privKey = e.privKey
        }

        var coinUtil = require("../util"), timeUtil = require("../util/time"), Key = require("./Key"), SIN = require("./SIN");
        SINKey.prototype.generate = function () {
            this.privKey = Key.generateSync(), this.created = timeUtil.curtime()
        }, SINKey.prototype.pubkeyHash = function () {
            return coinUtil.sha256ripe160(this.privKey.public)
        }, SINKey.prototype.storeObj = function () {
            var e = this.privKey.public.toString("hex"), t = this.pubkeyHash(), i = new SIN(SIN.SIN_EPHEM, t), r = {
                created: this.created,
                priv: this.privKey.private.toString("hex"),
                pub: e,
                sin: i.toString()
            };
            return r
        }, module.exports = SINKey;
    }, {"../util": 163, "../util/time": 166, "./Key": "ALJ4PS", "./SIN": "tBM27q"}],
    "hQ0t76": [function (require, module, exports) {
        (function (t) {
            function e(t) {
                this.buffer = t ? t : f.EMPTY_BUFFER, this.chunks = [], this.parse()
            }

            function r(t) {
                return t == h.map.OP_0 || t >= h.map.OP_1 && t <= h.map.OP_16
            }

            function n(t) {
                return t < h.map.OP_PUSHDATA1 ? 1 : 255 >= t ? 2 : 65535 >= t ? 3 : 5
            }

            function s(e) {
                var r = void 0;
                return e < h.map.OP_PUSHDATA1 ? (r = new t(1), r.writeUInt8(e, 0)) : 255 >= e ? (r = new t(2), r.writeUInt8(h.map.OP_PUSHDATA1, 0), r.writeUInt8(e, 1)) : 65535 >= e ? (r = new t(3), r.writeUInt8(h.map.OP_PUSHDATA2, 0), r.writeUInt16LE(e, 1)) : (r = new t(5), r.writeUInt8(h.map.OP_PUSHDATA4, 0), r.writeUInt32LE(e, 1)), r
            }

            var u = (require("../config"), require("../util/log")), h = require("./Opcode"), o = require("buffertools"), f = require("../util/util"), c = require("../util/BinaryParser"), p = require("bufferput"), a = 0, l = 1, g = 2, k = 3, y = 4, S = ["unknown", "pubkey", "pubkeyhash", "multisig", "scripthash"];
            e.TX_UNKNOWN = a, e.TX_PUBKEY = l, e.TX_PUBKEYHASH = g, e.TX_MULTISIG = k, e.TX_SCRIPTHASH = y, e.prototype.parse = function () {
                this.chunks = [];
                for (var t = new c(this.buffer); !t.eof();) {
                    var e, r, n = t.word8();
                    n > 0 && n < h.map.OP_PUSHDATA1 ? this.chunks.push(t.buffer(n)) : n === h.map.OP_PUSHDATA1 ? (e = t.word8(), r = t.buffer(e), this.chunks.push(r)) : n === h.map.OP_PUSHDATA2 ? (e = t.word16le(), r = t.buffer(e), this.chunks.push(r)) : n === h.map.OP_PUSHDATA4 ? (e = t.word32le(), r = t.buffer(e), this.chunks.push(r)) : this.chunks.push(n)
                }
            }, e.prototype.isPushOnly = function () {
                for (var e = 0; e < this.chunks.length; e++) {
                    var r = this.chunks[e];
                    if (!t.isBuffer(r) && r > h.map.OP_16)return !1
                }
                return !0
            }, e.prototype.isP2SH = function () {
                return 3 == this.chunks.length && this.chunks[0] == h.map.OP_HASH160 && t.isBuffer(this.chunks[1]) && 20 == this.chunks[1].length && this.chunks[2] == h.map.OP_EQUAL
            }, e.prototype.isPubkey = function () {
                return 2 == this.chunks.length && t.isBuffer(this.chunks[0]) && this.chunks[1] == h.map.OP_CHECKSIG
            }, e.prototype.isPubkeyHash = function () {
                return 5 == this.chunks.length && this.chunks[0] == h.map.OP_DUP && this.chunks[1] == h.map.OP_HASH160 && t.isBuffer(this.chunks[2]) && 20 == this.chunks[2].length && this.chunks[3] == h.map.OP_EQUALVERIFY && this.chunks[4] == h.map.OP_CHECKSIG
            }, e.prototype.isMultiSig = function () {
                return this.chunks.length > 3 && r(this.chunks[0]) && this.chunks.slice(1, this.chunks.length - 2).every(function (e) {
                        return t.isBuffer(e)
                    }) && r(this.chunks[this.chunks.length - 2]) && this.chunks[this.chunks.length - 1] == h.map.OP_CHECKMULTISIG
            }, e.prototype.isPubkeyHashScriptSig = function () {
                return 2 == this.chunks.length && t.isBuffer(this.chunks[0]) && t.isBuffer(this.chunks[1])
            }, e.prototype.isP2shScriptSig = function () {
                if (!r(this.chunks[0]) || 0 !== this.chunks[0])return !1;
                var t = new e(this.chunks[this.chunks.length - 1]), n = t.classify();
                return n !== a
            }, e.prototype.isMultiSigScriptSig = function () {
                return r(this.chunks[0]) && 0 === this.chunks[0] ? !this.isP2shScriptSig() : !1
            }, e.prototype.isPubkeyScriptSig = function () {
                return 1 == this.chunks.length && t.isBuffer(this.chunks[0])
            }, e.prototype.countSignatures = function () {
                var t = 0, e = this.chunks.length;
                return t = this.isMultiSigScriptSig() ? e - 1 : this.isP2shScriptSig() ? e - 2 : this.isPubkeyHashScriptSig() ? 1 : 0
            }, e.prototype.getSignatures = function () {
                ret = [];
                var t = this.chunks.length;
                if (this.isMultiSigScriptSig())for (var e = 1; t > e; e++)ret.push(this.chunks[e]); else if (this.isP2shScriptSig())for (var e = 1; t - 1 > e; e++)ret.push(this.chunks[e]); else this.isPubkeyHashScriptSig() && ret.push(this.chunks[0]);
                return ret
            }, e.prototype.getHashType = function () {
                for (var t = this.getSignatures(), e = null, r = 0; r < t.length; r++) {
                    var n = t[r], i = n[n.length - 1];
                    if (null !== e && e !== i)return null;
                    e = i
                }
                return e
            }, e.prototype.countMissingSignatures = function () {
                if (this.isMultiSig())return u.debug("Can not count missing signatures on normal Multisig script"), null;
                var t = 0, n = this.chunks.length;
                if (r(this.chunks[0]) && 0 === this.chunks[0]) {
                    var i = new e(this.chunks[n - 1]);
                    if (r(i.chunks[0])) {
                        var s = i.chunks[0] - 80;
                        t = s - (n - 2)
                    } else u.debug("Unrecognized script type")
                } else 0 === o.compare(this.getBuffer(), f.EMPTY_BUFFER) && (t = 1);
                return t
            }, e.prototype.finishedMultiSig = function () {
                var t = this.countMissingSignatures();
                return null === t ? null : 0 === t
            }, e.prototype.getMultiSigInfo = function () {
                if (!this.isMultiSig())throw new Error("Script.getMultiSigInfo(): Not a multiSig script.");
                for (var t = this.chunks[0] - 80, e = this.chunks[this.chunks.length - 2] - 80, r = [], n = 1; n < this.chunks.length - 2; n++)r.push(this.chunks[n]);
                if (r.length != e)throw new Error("Script.getMultiSigInfo(): Amount of PKs does not match what the script specifies.");
                return {nsigs: t, npubkeys: e, pubkeys: r}
            }, e.prototype.prependOp0 = function () {
                var t = [0];
                for (i in this.chunks)this.chunks.hasOwnProperty(i) && t.push(this.chunks[i]);
                return this.chunks = t, this.updateBuffer(), this
            }, e.prototype.classify = function () {
                return this.isPubkeyHash() ? g : this.isP2SH() ? y : this.isMultiSig() ? k : this.isPubkey() ? l : a
            }, e.prototype.capture = function () {
                var t = this.classify(), e = [];
                switch (t) {
                    case l:
                        e.push(this.chunks[0]);
                        break;
                    case g:
                        e.push(this.chunks[2]);
                        break;
                    case k:
                        for (var r = 1; r < this.chunks.length - 2; r++)e.push(this.chunks[r]);
                        break;
                    case y:
                        e.push(this.chunks[1]);
                        break;
                    case a:
                }
                return e
            }, e.prototype.captureOne = function () {
                var t = this.capture();
                return t[0]
            }, e.prototype.getOutType = function () {
                var t = this.classify();
                switch (t) {
                    case l:
                        return "Pubkey";
                    case g:
                        return "Address";
                    default:
                        return "Strange"
                }
            }, e.prototype.getRawOutType = function () {
                return S[this.classify()]
            }, e.prototype.simpleOutHash = function () {
                switch (this.getOutType()) {
                    case"Address":
                        return this.chunks[2];
                    case"Pubkey":
                        return f.sha256ripe160(this.chunks[0]);
                    default:
                        return u.debug("Encountered non-standard scriptPubKey"), u.debug("Strange script was: " + this.toString()), null
                }
            }, e.prototype.getInType = function () {
                return 1 == this.chunks.length ? "Pubkey" : 2 == this.chunks.length && t.isBuffer(this.chunks[0]) && t.isBuffer(this.chunks[1]) ? "Address" : "Strange"
            }, e.prototype.simpleInPubKey = function () {
                switch (this.getInType()) {
                    case"Address":
                        return this.chunks[1];
                    case"Pubkey":
                        return null;
                    default:
                        return u.debug("Encountered non-standard scriptSig"), u.debug("Strange script was: " + this.toString()), null
                }
            }, e.prototype.getBuffer = function () {
                return this.buffer
            }, e.prototype.serialize = e.prototype.getBuffer, e.prototype.getStringContent = function (e, r) {
                null === e && (e = !0), "undefined" == typeof r && (r = 15);
                for (var n = "", i = 0, s = this.chunks.length; s > i; i++) {
                    var u = this.chunks[i];
                    if (i > 0 && (n += " "), n += t.isBuffer(u) ? "0x" + f.formatBuffer(u, e ? null : 0) : h.reverseMap[u], r && i > r) {
                        n += " ...";
                        break
                    }
                }
                return n
            }, e.prototype.toString = function (t, e) {
                var r = "<Script ";
                return r += this.getStringContent(t, e), r += ">"
            }, e.prototype.writeOp = function (e) {
                var r = t(this.buffer.length + 1);
                return this.buffer.copy(r), r.writeUInt8(e, this.buffer.length), this.buffer = r, this.chunks.push(e), this
            }, e.prototype.writeN = function (t) {
                if (0 > t || t > 16)throw new Error("writeN: out of range value " + t);
                this.writeOp(0 == t ? h.map.OP_0 : h.map.OP_1 + t - 1)
            }, e.prototype.writeBytes = function (e) {
                this.buffer.length + n(e.length) + e.length;
                this.buffer = t.concat([this.buffer, s(e.length), e]), this.chunks.push(e)
            }, e.prototype.updateBuffer = function () {
                this.buffer = e.chunksToBuffer(this.chunks)
            }, e.prototype.findAndDelete = function (e) {
                var r = !1;
                if (t.isBuffer(e))for (var n = 0, i = this.chunks.length; i > n; n++)t.isBuffer(this.chunks[n]) && 0 === o.compare(this.chunks[n], e) && (this.chunks.splice(n, 1), n--, r = !0); else {
                    if ("number" != typeof e)throw new Error("Invalid chunk datatype.");
                    for (var n = 0, i = this.chunks.length; i > n; n++)this.chunks[n] === e && (this.chunks.splice(n, 1), n--, r = !0)
                }
                r && this.updateBuffer()
            }, e.createPubKeyOut = function (t) {
                var r = new e;
                return r.writeBytes(t), r.writeOp(h.map.OP_CHECKSIG), r
            }, e.createPubKeyHashOut = function (t) {
                var r = new e;
                return r.writeOp(h.map.OP_DUP), r.writeOp(h.map.OP_HASH160), r.writeBytes(t), r.writeOp(h.map.OP_EQUALVERIFY), r.writeOp(h.map.OP_CHECKSIG), r
            }, e._sortKeys = function (t) {
                return t.sort(function (t, e) {
                    for (var r = t.length > t.length ? t.length : e.length, n = 0; r >= n; n++) {
                        if (void 0 === t[n])return -1;
                        if (void 0 === e[n])return 1;
                        if (t[n] < e[n])return -1;
                        if (t[n] > e[n])return 1
                    }
                    return 0
                })
            }, e.createMultisig = function (t, r, n) {
                n = n || {};
                var i = n.noSorting ? r : this._sortKeys(r), s = new e;
                return s.writeN(t), i.forEach(function (t) {
                    s.writeBytes(t)
                }), s.writeN(i.length), s.writeOp(h.map.OP_CHECKMULTISIG), s
            }, e.createP2SH = function (t) {
                var r = new e;
                return r.writeOp(h.map.OP_HASH160), r.writeBytes(t), r.writeOp(h.map.OP_EQUAL), r
            }, e.fromTestData = function (r) {
                r = r.map(function (e) {
                    return "string" == typeof e ? new t(e, "hex") : e
                });
                var n = new e;
                return n.chunks = r, n.updateBuffer(), n
            }, e.fromChunks = function (t) {
                var r = new e;
                return r.chunks = t, r.updateBuffer(), r
            }, e.fromHumanReadable = function (t) {
                return new e(e.stringToBuffer(t))
            }, e.prototype.toHumanReadable = function () {
                for (var e = "", r = 0, n = this.chunks.length; n > r; r++) {
                    var i = this.chunks[r];
                    if (r > 0 && (e += " "), t.isBuffer(i))0 === i.length ? e += "0" : (e += "0x" + f.formatBuffer(s(i.length), 0) + " ", e += "0x" + f.formatBuffer(i, 0)); else {
                        var u = h.reverseMap[i];
                        "undefined" == typeof u && (u = "0x" + i.toString(16)), e += u
                    }
                }
                return e
            }, e.stringToBuffer = function (r) {
                for (var n = new p, i = r.split(" "), s = 0; s < i.length; s++) {
                    var u = i[s];
                    if ("" !== u)if (u.length > 2 && "0x" === u.substring(0, 2))n.put(new t(u.substring(2, u.length), "hex")); else {
                        var o = h.map["OP_" + u] || h.map[u];
                        if ("undefined" != typeof o)n.word8(o); else {
                            var c = parseInt(u);
                            if (isNaN(c)) {
                                if ("'" !== u[0] || "'" !== u[u.length - 1])throw new Error('Could not parse word "' + u + '" from script "' + r + '"');
                                u = u.substring(1, u.length - 1), n.put(e.chunksToBuffer([new t(u)]))
                            } else {
                                var a = f.intToBufferSM(c);
                                n.put(e.chunksToBuffer([a]))
                            }
                        }
                    }
                }
                return n.buffer()
            }, e.chunksToBuffer = function (e) {
                for (var r = new p, n = 0, i = e.length; i > n; n++) {
                    var s = e[n];
                    if (t.isBuffer(s))s.length < h.map.OP_PUSHDATA1 ? r.word8(s.length) : s.length <= 255 ? (r.word8(h.map.OP_PUSHDATA1), r.word8(s.length)) : s.length <= 65535 ? (r.word8(h.map.OP_PUSHDATA2), r.word16le(s.length)) : (r.word8(h.map.OP_PUSHDATA4), r.word32le(s.length)), r.put(s); else {
                        if ("number" != typeof s)throw new Error("Script.chunksToBuffer(): Invalid chunk datatype");
                        r.word8(s)
                    }
                }
                return r.buffer()
            }, module.exports = e
        }).call(this, require("buffer").Buffer);
    }, {
        "../config": "4itQ50",
        "../util/BinaryParser": "b3ZSD7",
        "../util/log": "AdF7pF",
        "../util/util": "ACyo5H",
        "./Opcode": "Zm7/h9",
        "buffer": 78,
        "bufferput": "aXRuS6",
        "buffertools": "fugeBw"
    }],
    "./lib/Script": [function (require, module, exports) {
        module.exports = require('hQ0t76');
    }, {}],
    "Q/ZWXW": [function (require, module, exports) {
        (function (a, t) {
            function e(a) {
                this.opts = a || {}, this.stack = [], this.disableUnsafeOpcodes = !0
            }

            var s = (require("../config"), require("../util/log"), require("../util"), require("./Opcode")), r = require("buffertools"), c = require("bignum"), i = require("../util"), o = require("./Script"), n = require("./Key"), p = i.intToBufferSM, h = i.bufferSMToInt, P = e.SIGHASH_ALL = 1, O = (e.SIGHASH_NONE = 2, e.SIGHASH_SINGLE = 3), k = e.SIGHASH_ANYONECANPAY = 128;
            e.prototype.eval = function (a, e, n, P, O) {
                function k(O) {
                    function T() {
                        if (j && z > 0) {
                            var a = X[Z], r = q[J];
                            l(a, r, Y, e, n, P, function (a, t) {
                                !a && t ? (Z++, z--) : (J++, x--, z > x && (j = !1)), T.call(this)
                            }.bind(this))
                        } else {
                            if (this.stack.push(new t([j ? 1 : 0])), g === s.map.OP_CHECKMULTISIGVERIFY) {
                                if (!j)throw new Error("OP_CHECKMULTISIGVERIFY negative");
                                this.stackPop()
                            }
                            k.call(this, O)
                        }
                    }

                    try {
                        if (_ >= a.chunks.length)return f.length ? void O(new Error("Execution stack ended non-empty")) : void O(null);
                        var S = !~f.indexOf(!1), g = a.chunks[_++];
                        if (g.length > 520)throw new Error("Max push value size exceeded (>520)");
                        if (g > s.map.OP_16 && ++v > 201)throw new Error("Opcode limit exceeded (>200)");
                        if (this.disableUnsafeOpcodes && "number" == typeof g && (g === s.map.OP_CAT || g === s.map.OP_SUBSTR || g === s.map.OP_LEFT || g === s.map.OP_RIGHT || g === s.map.OP_INVERT || g === s.map.OP_AND || g === s.map.OP_OR || g === s.map.OP_XOR || g === s.map.OP_2MUL || g === s.map.OP_2DIV || g === s.map.OP_MUL || g === s.map.OP_DIV || g === s.map.OP_MOD || g === s.map.OP_LSHIFT || g === s.map.OP_RSHIFT))throw new Error("Encountered a disabled opcode");
                        if (S && t.isBuffer(g))this.stack.push(g); else if (S || s.map.OP_IF <= g && g <= s.map.OP_ENDIF)switch (g) {
                            case s.map.OP_0:
                                this.stack.push(new t([]));
                                break;
                            case s.map.OP_1NEGATE:
                            case s.map.OP_1:
                            case s.map.OP_2:
                            case s.map.OP_3:
                            case s.map.OP_4:
                            case s.map.OP_5:
                            case s.map.OP_6:
                            case s.map.OP_7:
                            case s.map.OP_8:
                            case s.map.OP_9:
                            case s.map.OP_10:
                            case s.map.OP_11:
                            case s.map.OP_12:
                            case s.map.OP_13:
                            case s.map.OP_14:
                            case s.map.OP_15:
                            case s.map.OP_16:
                                var b = g - s.map.OP_1 + 1, d = p(b);
                                this.stack.push(d);
                                break;
                            case s.map.OP_NOP:
                            case s.map.OP_NOP1:
                            case s.map.OP_NOP2:
                            case s.map.OP_NOP3:
                            case s.map.OP_NOP4:
                            case s.map.OP_NOP5:
                            case s.map.OP_NOP6:
                            case s.map.OP_NOP7:
                            case s.map.OP_NOP8:
                            case s.map.OP_NOP9:
                            case s.map.OP_NOP10:
                                break;
                            case s.map.OP_IF:
                            case s.map.OP_NOTIF:
                                var I = !1;
                                S && (I = u(this.stackPop()), g === s.map.OP_NOTIF && (I = !I)), f.push(I);
                                break;
                            case s.map.OP_ELSE:
                                if (f.length < 1)throw new Error("Unmatched OP_ELSE");
                                f[f.length - 1] = !f[f.length - 1];
                                break;
                            case s.map.OP_ENDIF:
                                if (f.length < 1)throw new Error("Unmatched OP_ENDIF");
                                f.pop();
                                break;
                            case s.map.OP_VERIFY:
                                var I = u(this.stackTop());
                                if (!I)throw new Error("OP_VERIFY negative");
                                this.stackPop();
                                break;
                            case s.map.OP_RETURN:
                                throw new Error("OP_RETURN");
                            case s.map.OP_TOALTSTACK:
                                E.push(this.stackPop());
                                break;
                            case s.map.OP_FROMALTSTACK:
                                if (E.length < 1)throw new Error("OP_FROMALTSTACK with alt stack empty");
                                this.stack.push(E.pop());
                                break;
                            case s.map.OP_2DROP:
                                this.stackPop(), this.stackPop();
                                break;
                            case s.map.OP_2DUP:
                                var N = this.stackTop(2), A = this.stackTop(1);
                                this.stack.push(N), this.stack.push(A);
                                break;
                            case s.map.OP_3DUP:
                                var N = this.stackTop(3), A = this.stackTop(2), R = this.stackTop(1);
                                this.stack.push(N), this.stack.push(A), this.stack.push(R);
                                break;
                            case s.map.OP_2OVER:
                                var N = this.stackTop(4), A = this.stackTop(3);
                                this.stack.push(N), this.stack.push(A);
                                break;
                            case s.map.OP_2ROT:
                                var N = this.stackTop(6), A = this.stackTop(5);
                                this.stack.splice(this.stack.length - 6, 2), this.stack.push(N), this.stack.push(A);
                                break;
                            case s.map.OP_2SWAP:
                                this.stackSwap(4, 2), this.stackSwap(3, 1);
                                break;
                            case s.map.OP_IFDUP:
                                var I = this.stackTop();
                                u(I) && this.stack.push(I);
                                break;
                            case s.map.OP_DEPTH:
                                var I = c(this.stack.length);
                                this.stack.push(p(I));
                                break;
                            case s.map.OP_DROP:
                                this.stackPop();
                                break;
                            case s.map.OP_DUP:
                                this.stack.push(this.stackTop());
                                break;
                            case s.map.OP_NIP:
                                if (this.stack.length < 2)throw new Error("OP_NIP insufficient stack size");
                                this.stack.splice(this.stack.length - 2, 1);
                                break;
                            case s.map.OP_OVER:
                                this.stack.push(this.stackTop(2));
                                break;
                            case s.map.OP_PICK:
                            case s.map.OP_ROLL:
                                var L = m(this.stackPop());
                                if (0 > L || L >= this.stack.length)throw new Error("OP_PICK/OP_ROLL insufficient stack size");
                                var I = this.stackTop(L + 1);
                                g === s.map.OP_ROLL && this.stack.splice(this.stack.length - L - 1, 1), this.stack.push(I);
                                break;
                            case s.map.OP_ROT:
                                this.stackSwap(3, 2), this.stackSwap(2, 1);
                                break;
                            case s.map.OP_SWAP:
                                this.stackSwap(2, 1);
                                break;
                            case s.map.OP_TUCK:
                                if (this.stack.length < 2)throw new Error("OP_TUCK insufficient stack size");
                                this.stack.splice(this.stack.length - 2, 0, this.stackTop());
                                break;
                            case s.map.OP_CAT:
                                var N = this.stackTop(2), A = this.stackTop(1);
                                this.stackPop(), this.stackPop(), this.stack.push(t.concat([N, A]));
                                break;
                            case s.map.OP_SUBSTR:
                                var U = this.stackTop(3), H = m(this.stackTop(2)), y = m(this.stackTop(1));
                                if (0 > H || 0 > y)throw new Error("OP_SUBSTR start < 0 or len < 0");
                                if (H + y >= U.length)throw new Error("OP_SUBSTR range out of bounds");
                                this.stackPop(), this.stackPop(), this.stack[this.stack.length - 1] = U.slice(H, H + y);
                                break;
                            case s.map.OP_LEFT:
                            case s.map.OP_RIGHT:
                                var U = this.stackTop(2), F = m(this.stackTop(1));
                                if (0 > F)throw new Error("OP_LEFT/OP_RIGHT size < 0");
                                F > U.length && (F = U.length), this.stackPop(), this.stack[this.stack.length - 1] = g === s.map.OP_LEFT ? U.slice(0, F) : U.slice(U.length - F);
                                break;
                            case s.map.OP_SIZE:
                                var I = c(this.stackTop().length);
                                this.stack.push(p(I));
                                break;
                            case s.map.OP_INVERT:
                                for (var U = this.stackTop(), C = 0, D = U.length; D > C; C++)U[C] = ~U[C];
                                break;
                            case s.map.OP_AND:
                            case s.map.OP_OR:
                            case s.map.OP_XOR:
                                var N = this.stackTop(2), A = this.stackTop(1);
                                this.stackPop(), this.stackPop();
                                var M = new t(Math.max(N.length, A.length));
                                if (g === s.map.OP_AND)for (var C = 0, D = M.length; D > C; C++)M[C] = N[C] & A[C]; else if (g === s.map.OP_OR)for (var C = 0, D = M.length; D > C; C++)M[C] = N[C] | A[C]; else if (g === s.map.OP_XOR)for (var C = 0, D = M.length; D > C; C++)M[C] = N[C] ^ A[C];
                                this.stack.push(M);
                                break;
                            case s.map.OP_EQUAL:
                            case s.map.OP_EQUALVERIFY:
                                var N = this.stackTop(2), A = this.stackTop(1), I = 0 === r.compare(N, A);
                                if (this.stackPop(), this.stackPop(), this.stack.push(new t([I ? 1 : 0])), g === s.map.OP_EQUALVERIFY) {
                                    if (!I)throw new Error("OP_EQUALVERIFY negative");
                                    this.stackPop()
                                }
                                break;
                            case s.map.OP_1ADD:
                            case s.map.OP_1SUB:
                            case s.map.OP_2MUL:
                            case s.map.OP_2DIV:
                            case s.map.OP_NEGATE:
                            case s.map.OP_ABS:
                            case s.map.OP_NOT:
                            case s.map.OP_0NOTEQUAL:
                                var V = h(this.stackTop());
                                switch (g) {
                                    case s.map.OP_1ADD:
                                        V = V.add(1);
                                        break;
                                    case s.map.OP_1SUB:
                                        V = V.sub(1);
                                        break;
                                    case s.map.OP_2MUL:
                                        V = V.mul(2);
                                        break;
                                    case s.map.OP_2DIV:
                                        V = V.div(2);
                                        break;
                                    case s.map.OP_NEGATE:
                                        V = V.neg();
                                        break;
                                    case s.map.OP_ABS:
                                        V = V.abs();
                                        break;
                                    case s.map.OP_NOT:
                                        V = c(0 == V.cmp(0) ? 1 : 0);
                                        break;
                                    case s.map.OP_0NOTEQUAL:
                                        V = c(0 == V.cmp(0) ? 0 : 1)
                                }
                                this.stack[this.stack.length - 1] = p(V);
                                break;
                            case s.map.OP_ADD:
                            case s.map.OP_SUB:
                            case s.map.OP_MUL:
                            case s.map.OP_DIV:
                            case s.map.OP_MOD:
                            case s.map.OP_LSHIFT:
                            case s.map.OP_RSHIFT:
                            case s.map.OP_BOOLAND:
                            case s.map.OP_BOOLOR:
                            case s.map.OP_NUMEQUAL:
                            case s.map.OP_NUMEQUALVERIFY:
                            case s.map.OP_NUMNOTEQUAL:
                            case s.map.OP_LESSTHAN:
                            case s.map.OP_GREATERTHAN:
                            case s.map.OP_LESSTHANOREQUAL:
                            case s.map.OP_GREATERTHANOREQUAL:
                            case s.map.OP_MIN:
                            case s.map.OP_MAX:
                                var V, N = h(this.stackTop(2)), A = h(this.stackTop(1));
                                switch (g) {
                                    case s.map.OP_ADD:
                                        V = N.add(A);
                                        break;
                                    case s.map.OP_SUB:
                                        V = N.sub(A);
                                        break;
                                    case s.map.OP_MUL:
                                        V = N.mul(A);
                                        break;
                                    case s.map.OP_DIV:
                                        V = N.div(A);
                                        break;
                                    case s.map.OP_MOD:
                                        V = N.mod(A);
                                        break;
                                    case s.map.OP_LSHIFT:
                                        if (A.cmp(0) < 0 || A.cmp(2048) > 0)throw new Error("OP_LSHIFT parameter out of bounds");
                                        V = N.shiftLeft(A);
                                        break;
                                    case s.map.OP_RSHIFT:
                                        if (A.cmp(0) < 0 || A.cmp(2048) > 0)throw new Error("OP_RSHIFT parameter out of bounds");
                                        V = N.shiftRight(A);
                                        break;
                                    case s.map.OP_BOOLAND:
                                        V = c(0 != N.cmp(0) && 0 != A.cmp(0) ? 1 : 0);
                                        break;
                                    case s.map.OP_BOOLOR:
                                        V = c(0 != N.cmp(0) || 0 != A.cmp(0) ? 1 : 0);
                                        break;
                                    case s.map.OP_NUMEQUAL:
                                    case s.map.OP_NUMEQUALVERIFY:
                                        V = c(0 == N.cmp(A) ? 1 : 0);
                                        break;
                                    case s.map.OP_NUMNOTEQUAL:
                                        V = c(0 != N.cmp(A) ? 1 : 0);
                                        break;
                                    case s.map.OP_LESSTHAN:
                                        V = c(N.lt(A) ? 1 : 0);
                                        break;
                                    case s.map.OP_GREATERTHAN:
                                        V = c(N.gt(A) ? 1 : 0);
                                        break;
                                    case s.map.OP_LESSTHANOREQUAL:
                                        V = c(N.gt(A) ? 0 : 1);
                                        break;
                                    case s.map.OP_GREATERTHANOREQUAL:
                                        V = c(N.lt(A) ? 0 : 1);
                                        break;
                                    case s.map.OP_MIN:
                                        V = N.lt(A) ? N : A;
                                        break;
                                    case s.map.OP_MAX:
                                        V = N.gt(A) ? N : A
                                }
                                if (this.stackPop(), this.stackPop(), this.stack.push(p(V)), g === s.map.OP_NUMEQUALVERIFY) {
                                    if (!u(this.stackTop()))throw new Error("OP_NUMEQUALVERIFY negative");
                                    this.stackPop()
                                }
                                break;
                            case s.map.OP_WITHIN:
                                var N = h(this.stackTop(3)), A = h(this.stackTop(2)), R = h(this.stackTop(1));
                                this.stackPop(), this.stackPop(), this.stackPop();
                                var I = N.cmp(A) >= 0 && N.cmp(R) < 0;
                                this.stack.push(p(I ? 1 : 0));
                                break;
                            case s.map.OP_RIPEMD160:
                            case s.map.OP_SHA1:
                            case s.map.OP_SHA256:
                            case s.map.OP_HASH160:
                            case s.map.OP_HASH256:
                                var G, I = this.stackPop();
                                g === s.map.OP_RIPEMD160 ? G = i.ripe160(I) : g === s.map.OP_SHA1 ? G = i.sha1(I) : g === s.map.OP_SHA256 ? G = i.sha256(I) : g === s.map.OP_HASH160 ? G = i.sha256ripe160(I) : g === s.map.OP_HASH256 && (G = i.twoSha256(I)), this.stack.push(G);
                                break;
                            case s.map.OP_CODESEPARATOR:
                                w = _;
                                break;
                            case s.map.OP_CHECKSIG:
                            case s.map.OP_CHECKSIGVERIFY:
                                var B = this.stackTop(2), K = this.stackTop(1), Q = a.chunks.slice(w), Y = o.fromChunks(Q);
                                return Y.findAndDelete(B), this.isCanonicalSignature(new t(B)), void l(B, K, Y, e, n, P, function (a, e) {
                                    var r;
                                    if (r = a ? !1 : e, this.stackPop(), this.stackPop(), this.stack.push(new t([r ? 1 : 0])), g === s.map.OP_CHECKSIGVERIFY) {
                                        if (!r)throw new Error("OP_CHECKSIGVERIFY negative");
                                        this.stackPop()
                                    }
                                    k.call(this, O)
                                }.bind(this));
                            case s.map.OP_CHECKMULTISIG:
                            case s.map.OP_CHECKMULTISIGVERIFY:
                                var x = m(this.stackPop());
                                if (0 > x || x > 20)throw new Error("OP_CHECKMULTISIG keysCount out of bounds");
                                if (v += x, v > 201)throw new Error("Opcode limit exceeded (>200)");
                                for (var q = [], C = 0, D = x; D > C; C++) {
                                    var K = this.stackPop();
                                    q.push(K)
                                }
                                var z = m(this.stackPop());
                                if (0 > z || z > x)throw new Error("OP_CHECKMULTISIG sigsCount out of bounds");
                                for (var X = [], C = 0, D = z; D > C; C++)X.push(this.stackPop());
                                this.stackPop();
                                var Q = a.chunks.slice(w), Y = o.fromChunks(Q), W = this;
                                X.forEach(function (a) {
                                    W.isCanonicalSignature(new t(a)), Y.findAndDelete(a)
                                });
                                var j = !0, Z = 0, J = 0;
                                return void T.call(this);
                            default:
                                throw new Error("Unknown opcode encountered")
                        }
                        if (this.stack.length + E.length > 1e3)throw new Error("Maximum stack size exceeded");
                        k.call(this, O)
                    } catch ($) {
                        O($)
                    }
                }

                if ("function" != typeof O)throw new Error("ScriptInterpreter.eval() requires a callback");
                var _ = 0, f = [], E = [], w = 0, v = 0;
                return a.buffer.length > 1e4 ? (O(new Error("Oversized script (> 10k bytes)")), this) : void k.call(this, O)
            }, e.prototype.evalTwo = function (a, t, e, s, r, c) {
                var i = this;
                i.eval(a, e, s, r, function (a) {
                    return a ? void c(a) : void i.eval(t, e, s, r, c)
                })
            }, e.prototype.stackTop = function (a) {
                if (a = +a || 1, 1 > a && (a = 1), a > this.stack.length)throw new Error("ScriptInterpreter.stackTop(): Stack underrun");
                return this.stack[this.stack.length - a]
            }, e.prototype.stackBack = function () {
                return this.stack[this.stack.length - 1]
            }, e.prototype.stackPop = function () {
                if (this.stack.length < 1)throw new Error("ScriptInterpreter.stackTop(): Stack underrun");
                return this.stack.pop()
            }, e.prototype.stackSwap = function (a, t) {
                if (this.stack.length < a || this.stack.length < t)throw new Error("ScriptInterpreter.stackTop(): Stack underrun");
                var e = this.stack, s = e.length, r = e[s - a];
                e[s - a] = e[s - t], e[s - t] = r
            }, e.prototype.getPrimitiveStack = function () {
                return this.stack.map(function (a) {
                    if (a.length > 2)return r.toHex(a.slice(0));
                    var t = h(a);
                    return t.cmp(-128) >= 0 && t.cmp(127) <= 0 ? t.toNumber() : r.toHex(a.slice(0))
                })
            };
            var u = e.castBool = function (a) {
                for (var t = 0, e = a.length; e > t; t++)if (0 != a[t])return t == e - 1 && 128 == a[t] ? !1 : !0;
                return !1
            }, m = e.castInt = function (a) {
                return h(a).toNumber()
            };
            e.prototype.getResult = function () {
                if (0 === this.stack.length)throw new Error("Empty stack after script evaluation");
                return u(this.stack[this.stack.length - 1])
            }, e.verify = function (a, t, s, r, c, i) {
                if ("function" != typeof i)throw new Error("ScriptInterpreter.verify() requires a callback");
                var o = new e;
                return o.evalTwo(a, t, s, r, c, function (a) {
                    if (a)return void i(a);
                    var t = o.getResult();
                    i(null, t)
                }), o
            }, e.prototype.verifyStep4 = function (a, t) {
                return 0 == t.stack.length ? void a(null, !1) : void a(null, u(t.stackBack()))
            }, e.prototype.verifyStep3 = function (a, t, e, s, r, c, i) {
                if (0 === this.stack.length)return void c(null, !1);
                if (0 == u(this.stackBack()))return void c(null, !1);
                if (!this.opts.verifyP2SH || !t.isP2SH())return void c(null, !0);
                if (!a.isPushOnly())return void c(null, !1);
                if (0 === i.length)throw new Error("siCopy should have length != 0");
                var n = new o(i.stackPop()), p = this;
                i.eval(n, e, s, r, function (a) {
                    return a ? c(a) : void p.verifyStep4(c, i)
                })
            }, e.prototype.verifyStep2 = function (a, t, s, r, c, i, o) {
                var o;
                this.opts.verifyP2SH && (o = new e(this.opts), this.stack.forEach(function (a) {
                    o.stack.push(a)
                }));
                var n = this;
                this.eval(t, s, r, c, function (e) {
                    return e ? i(e) : void n.verifyStep3(a, t, s, r, c, i, o)
                })
            }, e.prototype.verifyFull = function (a, t, e, s, r, c) {
                var i = this;
                this.eval(a, e, s, r, function (o) {
                    return o ? c(o) : void i.verifyStep2(a, t, e, s, r, c)
                })
            }, e.verifyFull = function (a, t, s, r, c, i, o) {
                var n = new e(i);
                n.verifyFull(a, t, s, r, c, o)
            };
            var l = e.checkSig = function (a, e, s, r, c, i, o) {
                if (!a.length)return void o(null, !1);
                if (0 === i)i = a[a.length - 1]; else if (i != a[a.length - 1])return void o(null, !1);
                a = a.slice(0, a.length - 1);
                var p = r.hashForSignature(s, c, i), h = new n;
                0 === e.length && (e = new t("00", "hex")), h.public = e, h.verifySignature(p, a, o)
            };
            e.prototype.isCanonicalSignature = function (a) {
                if (!t.isBuffer(a))throw new Error("arg should be a Buffer");
                if (this.opts.dontVerifyStrictEnc)return !0;
                var e = a.length;
                if (9 > e)throw new Error("Non-canonical signature: too short");
                if (e > 73)throw new Error("Non-canonical signature: too long");
                var s = a[e - 1] & ~k;
                if (P > s || s > O)throw new Error("Non-canonical signature: unknown hashtype byte");
                if (48 !== a[0])throw new Error("Non-canonical signature: wrong type");
                if (a[1] !== e - 3)throw new Error("Non-canonical signature: wrong length marker");
                var r = a[3];
                if (5 + r >= e)throw new Error("Non-canonical signature: S length misplaced");
                var c = a[5 + r];
                if (r + c + 7 !== e)throw new Error("Non-canonical signature: R+S length mismatch");
                var i = 4, o = new t(r);
                if (a.copy(o, 0, i, i + r), 2 !== a[i - 2])throw new Error("Non-canonical signature: R value type mismatch");
                if (0 == r)throw new Error("Non-canonical signature: R length is zero");
                if (128 & o[0])throw new Error("Non-canonical signature: R value negative");
                if (r > 1 && 0 == o[0] && !(128 & o[1]))throw new Error("Non-canonical signature: R value excessively padded");
                var n = 6 + r, p = new t(c);
                if (a.copy(p, 0, n, n + c), 2 != a[n - 2])throw new Error("Non-canonical signature: S value type mismatch");
                if (0 == c)throw new Error("Non-canonical signature: S length is zero");
                if (128 & p[0])throw new Error("Non-canonical signature: S value negative");
                if (c > 1 && 0 == p[0] && !(128 & p[1]))throw new Error("Non-canonical signature: S value excessively padded");
                if (this.opts.verifyEvenS && 1 & p[c - 1])throw new Error("Non-canonical signature: S value odd");
                return !0
            }, module.exports = e
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), require("buffer").Buffer);
    }, {
        "../config": "4itQ50",
        "../util": 163,
        "../util/log": "AdF7pF",
        "./Key": "ALJ4PS",
        "./Opcode": "Zm7/h9",
        "./Script": "hQ0t76",
        "/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95,
        "bignum": 49,
        "buffer": 78,
        "buffertools": "fugeBw"
    }],
    "./lib/ScriptInterpreter": [function (require, module, exports) {
        module.exports = require('Q/ZWXW');
    }, {}],
    "./lib/Transaction": [function (require, module, exports) {
        module.exports = require('LJhYtm');
    }, {}],
    "LJhYtm": [function (require, module, exports) {
        (function (t) {
            function e(e) {
                if ("object" != typeof e && (e = {}), e.o)this.o = e.o; else if (e.oTxHash && "undefined" != typeof e.oIndex && e.oIndex >= 0) {
                    var i = new t(e.oTxHash, "hex");
                    i = p.reverse(i);
                    var s = new t(4);
                    s.writeUInt32LE(e.oIndex, 0), this.o = t.concat([i, s])
                }
                this.s = t.isBuffer(e.s) ? e.s : t.isBuffer(e.script) ? e.script : h.EMPTY_BUFFER, this.q = e.q ? e.q : e.sequence
            }

            function i(t) {
                "object" != typeof t && (t = {}), this.v = t.v ? t.v : t.value, this.s = t.s ? t.s : t.script
            }

            function s(t) {
                "object" != typeof t && (t = {}), this.hash = t.hash || null, this.version = t.version, this.lock_time = t.lock_time, this.ins = Array.isArray(t.ins) ? t.ins.map(function (t) {
                    var i = new e;
                    return i.s = t.s, i.q = t.q, i.o = t.o, i
                }) : [], this.outs = Array.isArray(t.outs) ? t.outs.map(function (t) {
                    var e = new i;
                    return e.v = t.v, e.s = t.s, e
                }) : [], t.buffer && (this._buffer = t.buffer)
            }

            {
                var n = (require("../config"), require("../util/log"), require("./Address")), r = require("./Script"), o = require("./ScriptInterpreter"), h = require("../util"), u = require("bignum"), a = require("bufferput"), f = require("../util/BinaryParser"), p = (require("step"), require("buffertools")), c = (require("../util/error"), require("./WalletKey"), require("./PrivateKey"), require("preconditions").singleton()), l = t.concat([h.NULL_HASH, new t("FFFFFFFF", "hex")]);
                parseInt(1e-4 * h.COIN)
            }
            s.COINBASE_OP = l, e.MAX_SEQUENCE = 4294967295, e.prototype.getScript = function () {
                return new r(this.s)
            }, e.prototype.isCoinBase = function () {
                return this.o ? 0 === p.compare(new t(this.o), l) : !1
            }, e.prototype.serialize = function () {
                var e = h.varIntBuf(this.s.length), i = new t(4);
                i.writeUInt32LE(this.q, 0);
                var s = t.concat([this.o, e, this.s, i]);
                return s
            }, e.prototype.getOutpointHash = function () {
                return "undefined" != typeof this.o.outHashCache ? this.o.outHashCache : this.o.outHashCache = this.o.slice(0, 32)
            }, e.prototype.getOutpointIndex = function () {
                return this.o[32] + (this.o[33] << 8) + (this.o[34] << 16) + (this.o[35] << 24)
            }, e.prototype.setOutpointIndex = function (t) {
                this.o[32] = 255 & t, this.o[33] = t >> 8 & 255, this.o[34] = t >> 16 & 255, this.o[35] = t >> 24 & 255
            }, i.prototype.getValue = function () {
                return new f(this.v).word64lu()
            }, i.prototype.getScript = function () {
                return new r(this.s)
            }, i.prototype.serialize = function () {
                var e = h.varIntBuf(this.s.length);
                return t.concat([this.v, e, this.s])
            }, s.In = e, s.Out = i, s.prototype.isCoinBase = function () {
                return 1 == this.ins.length && this.ins[0].isCoinBase()
            }, s.prototype.isStandard = function () {
                var t;
                for (t = 0; t < this.ins.length; t++)if ("Strange" == this.ins[t].getScript().getInType())return !1;
                for (t = 0; t < this.outs.length; t++)if ("Strange" == this.outs[t].getScript().getOutType())return !1;
                return !0
            }, s.prototype.serialize = function () {
                var e = [], i = new t(4);
                i.writeUInt32LE(this.version, 0), e.push(i), e.push(h.varIntBuf(this.ins.length)), this.ins.forEach(function (t) {
                    e.push(t.serialize())
                }), e.push(h.varIntBuf(this.outs.length)), this.outs.forEach(function (t) {
                    e.push(t.serialize())
                });
                var i = new t(4);
                return i.writeUInt32LE(this.lock_time, 0), e.push(i), this._buffer = t.concat(e), this._buffer
            }, s.prototype.getBuffer = function () {
                return this._buffer ? this._buffer : this.serialize()
            }, s.prototype.calcHash = function () {
                return this.hash = h.twoSha256(this.getBuffer()), this.hash
            }, s.prototype.checkHash = function () {
                return this.hash && this.hash.length ? 0 === p.compare(this.calcHash(), this.hash) : !1
            }, s.prototype.getHash = function () {
                return this.hash && this.hash.length || (this.hash = this.calcHash()), this.hash
            }, s.prototype.calcNormalizedHash = function () {
                return this.normalizedHash = this.hashForSignature(new r, 0, v), this.normalizedHash
            }, s.prototype.getNormalizedHash = function () {
                return this.normalizedHash && this.normalizedHash.length || (this.normalizedHash = this.calcNormalizedHash()), this.normalizedHash
            }, s.prototype.inputs = function () {
                for (var t = [], e = 0; e < this.ins.length; e++) {
                    var i = this.ins[e], s = i.getOutpointHash(), n = i.getOutpointIndex();
                    t.push([s, n])
                }
                return t
            }, s.prototype.verifyInput = function (t, e, i, s) {
                var n = this.ins[t].getScript();
                return o.verifyFull(n, e, this, t, 0, i, s)
            }, s.prototype.getAffectedKeys = function (t) {
                if (!this.affects || !this.affects.length) {
                    this.affects = [];
                    for (var e = 0, i = this.outs.length; i > e; e++) {
                        var s = this.outs[e], n = s.getScript(), r = n.simpleOutPubKeyHash();
                        r && this.affects.push(r)
                    }
                    for (var o = t.txIndex, e = 0, i = this.ins.length; i > e; e++) {
                        var h = this.ins[e];
                        if (!h.isCoinBase()) {
                            var u = h.getOutpointHash(), a = h.getOutpointIndex(), f = u.toString("base64"), p = o[f];
                            if (!p)throw new Error("Input not found!");
                            var s = p[a], n = s.getScript(), r = n.simpleOutPubKeyHash();
                            r && this.affects.push(r)
                        }
                    }
                }
                var c = {};
                return this.affects.forEach(function (t) {
                    c[t.toString("base64")] = t
                }), c
            };
            var g = 171, v = s.SIGHASH_ALL = o.SIGHASH_ALL, y = s.SIGHASH_NONE = o.SIGHASH_NONE, S = s.SIGHASH_SINGLE = o.SIGHASH_SINGLE, I = s.SIGHASH_ANYONECANPAY = o.SIGHASH_ANYONECANPAY, d = function (t, e, i, s) {
                this.txTo = t, this.scriptCode = e, this.nIn = i, this.anyoneCanPay = !!(s & I);
                var n = 31 & s;
                this.hashSingle = n === S, this.hashNone = n === y, this.bytes = new a
            };
            d.prototype.serializeOutput = function (t) {
                if (this.hashSingle && t != this.nIn)this.bytes.put(h.INT64_MAX), this.bytes.varint(0); else {
                    var e = this.txTo.outs[t];
                    this.bytes.put(e.v), this.bytes.varint(e.s.length), this.bytes.put(e.s)
                }
            }, d.prototype.serializeScriptCode = function () {
                this.scriptCode.findAndDelete(g), this.bytes.varint(this.scriptCode.buffer.length), this.bytes.put(this.scriptCode.buffer)
            }, d.prototype.serializeInput = function (t) {
                this.anyoneCanPay && (t = this.nIn), this.bytes.put(this.txTo.ins[t].o), t !== this.nIn ? this.bytes.varint(0) : this.serializeScriptCode(), this.bytes.word32le(t !== this.nIn && (this.hashSingle || this.hashNone) ? 0 : this.txTo.ins[t].q)
            }, d.prototype.serialize = function () {
                this.bytes.word32le(this.txTo.version);
                var t = this.anyoneCanPay ? 1 : this.txTo.ins.length;
                this.bytes.varint(t);
                for (var e = 0; t > e; e++)this.serializeInput(e);
                var i = this.hashNone ? 0 : this.hashSingle ? this.nIn + 1 : this.txTo.outs.length;
                this.bytes.varint(i);
                for (var s = 0; i > s; s++)this.serializeOutput(s);
                this.bytes.word32le(this.txTo.lock_time)
            }, d.prototype.buffer = function () {
                return this.serialize(), this.bytes.buffer()
            }, s.Serializer = d;
            var b = function () {
                var e = new t(32);
                e.writeUInt8(1, 0);
                for (var i = 1; 32 > i; i++)e.writeUInt8(0, i);
                return e
            };
            s.prototype.getHashType = function (t) {
                c.checkArgument(t < this.ins.length);
                var e = this.ins[t], i = e.getScript();
                return i.getHashType()
            }, s.prototype.hashForSignature = function (e, i, s) {
                if (+i !== i || 0 > i || i >= this.ins.length)return b();
                var n = 31 & s;
                if (n === S && i >= this.outs.length)return b();
                var r = new d(this, e, i, s), o = r.buffer(), u = (new a).word32le(s).buffer();
                return o = t.concat([o, u]), h.twoSha256(o)
            }, s.prototype.getStandardizedObject = function () {
                var e = {
                    hash: h.formatHashFull(this.getHash()),
                    version: this.version,
                    lock_time: this.lock_time
                }, i = 8;
                i += h.getVarIntSize(this.ins.length);
                var s = this.ins.map(function (e) {
                    var s = {
                        prev_out: {
                            hash: p.reverse(new t(e.getOutpointHash())).toString("hex"),
                            n: e.getOutpointIndex()
                        }, sequence: e.q
                    };
                    return e.isCoinBase() ? s.coinbase = e.s.toString("hex") : s.scriptSig = new r(e.s).getStringContent(!1, 0), i += 36 + h.getVarIntSize(e.s.length) + e.s.length + 4, s
                });
                i += h.getVarIntSize(this.outs.length);
                var n = this.outs.map(function (t) {
                    return i += h.getVarIntSize(t.s.length) + t.s.length + 8, {
                        value: h.formatValue(t.v),
                        scriptPubKey: new r(t.s).getStringContent(!1, 0)
                    }
                });
                return e.size = i, e["in"] = s, e.out = n, e
            }, s.prototype.toObject = function () {
                return this
            }, s.prototype.fromObj = function (s) {
                var o = {};
                o.version = s.version || 1, o.lock_time = s.lock_time || 0, o.ins = [], o.outs = [], s.inputs.forEach(function (i) {
                    var s = new e;
                    s.s = h.EMPTY_BUFFER, s.q = 4294967295;
                    var n = new t(i.txid, "hex");
                    n = p.reverse(n);
                    var r = parseInt(i.vout), u = new t(4);
                    u.writeUInt32LE(r, 0), s.o = t.concat([n, u]), o.ins.push(s)
                });
                var a = Object.keys(s.outputs);
                a.forEach(function (t) {
                    var e = new n(t), a = r.createPubKeyHashOut(e.payload()), f = u(s.outputs[t]), p = h.bigIntToValue(f), c = new i;
                    c.v = p, c.s = a.getBuffer(), o.outs.push(c)
                }), this.lock_time = o.lock_time, this.version = o.version, this.ins = o.ins, this.outs = o.outs
            }, s.prototype.parse = function (s) {
                t.isBuffer(s) && (this._buffer = s, s = new f(s));
                {
                    var n;
                    s.pos
                }
                this.version = s.word32le();
                var r = s.varInt();
                for (this.ins = [], j = 0; r > j; j++) {
                    var o = new e;
                    o.o = s.buffer(36), n = s.varInt(), o.s = s.buffer(n), o.q = s.word32le(), this.ins.push(o)
                }
                var h = s.varInt();
                for (this.outs = [], j = 0; h > j; j++) {
                    var u = new i;
                    u.v = s.buffer(8), n = s.varInt(), u.s = s.buffer(n), this.outs.push(u)
                }
                this.lock_time = s.word32le(), this.calcHash()
            }, s.prototype.calcSize = function () {
                var t = 8;
                return t += h.getVarIntSize(this.ins.length), this.ins.forEach(function (e) {
                    t += 36 + h.getVarIntSize(e.s.length) + e.s.length + 4
                }), t += h.getVarIntSize(this.outs.length), this.outs.forEach(function (e) {
                    t += h.getVarIntSize(e.s.length) + e.s.length + 8
                }), this.size = t, t
            }, s.prototype.getSize = function () {
                return this.size || (this.size = this.calcSize()), this.size
            }, s.prototype.countInputSignatures = function (t) {
                var e = new r(this.ins[t].s);
                return e.countSignatures()
            }, s.prototype.countInputMissingSignatures = function (t) {
                var e = new r(this.ins[t].s);
                return e.countMissingSignatures()
            }, s.prototype.isInputComplete = function (t) {
                var e = this.countInputMissingSignatures(t);
                return null === e ? null : 0 === e
            }, s.prototype.isComplete = function () {
                for (var t = !0, e = this.ins.length, i = 0; e > i; i++)if (!this.isInputComplete(i)) {
                    t = !1;
                    break
                }
                return t
            }, s.prototype.getReceivingAddresses = function (t) {
                t || (t = "livenet"), ret = [];
                for (var e = 0; e < this.outs.length; e++) {
                    var i = this.outs[e], s = n.fromScriptPubKey(i.getScript(), t)[0].toString();
                    ret.push(s)
                }
                return ret
            }, s.prototype.getSendingAddresses = function (t) {
                var e = [];
                t || (t = "livenet");
                for (var i = 0; i < this.ins.length; i++) {
                    var s = this.ins[i], r = s.getScript();
                    if (0 !== r.getBuffer().length) {
                        var o = n.fromScriptSig(r, t);
                        e.push(o ? o.toString() : null)
                    } else e.push(null)
                }
                return e
            }, module.exports = s
        }).call(this, require("buffer").Buffer);
    }, {
        "../config": "4itQ50",
        "../util": 163,
        "../util/BinaryParser": "b3ZSD7",
        "../util/error": 162,
        "../util/log": "AdF7pF",
        "./Address": "G+CcXD",
        "./PrivateKey": "izTl9z",
        "./Script": "hQ0t76",
        "./ScriptInterpreter": "Q/ZWXW",
        "./WalletKey": "wWje7g",
        "bignum": 49,
        "buffer": 78,
        "bufferput": "aXRuS6",
        "buffertools": "fugeBw",
        "preconditions": 145,
        "step": 150
    }],
    "./lib/TransactionBuilder": [function (require, module, exports) {
        module.exports = require('D1Ge6m');
    }, {}],
    "D1Ge6m": [function (require, module, exports) {
        (function (t) {
            "use strict";
            function e(t) {
                return t = t || {}, this.vanilla = {}, this.vanilla.scriptSig = [], this.vanilla.opts = JSON.stringify(t), this.lockTime = t.lockTime || 0, this.spendUnconfirmed = t.spendUnconfirmed || !1, (t.fee || t.feeSat) && (this.givenFeeSat = t.fee ? t.fee * n.COIN : t.feeSat), this.remainderOut = t.remainderOut, this.signhash = t.signhash || f.SIGHASH_ALL, this.tx = {}, this.inputsSigned = 0, this
            }

            var i = require("./Address"), r = require("./Script"), n = require("../util"), s = require("bignum"), u = require("buffertools"), o = require("../networks"), a = require("./WalletKey"), h = require("./PrivateKey"), p = require("./Key"), c = require("../util/log"), f = require("./Transaction"), g = parseInt(1e-4 * n.COIN), l = 1;
            e.FEE_PER_1000B_SAT = g, e._scriptForPubkeys = function (e) {
                for (var i = e.pubkeys.length, n = [], s = 0; i > s; s++)n.push(new t(e.pubkeys[s], "hex"));
                return r.createMultisig(e.nreq, n)
            }, e._scriptForOut = function (t) {
                var e;
                if (t.address)e = new i(t.address).getScriptPubKey(); else {
                    if (!(t.pubkeys || t.nreq || t.nreq > 1))throw new Error("unknown out type");
                    e = this._scriptForPubkeys(t)
                }
                return e
            }, e.infoForP2sh = function (t, e) {
                var r = this._scriptForOut(t), s = n.sha256ripe160(r.getBuffer()), u = "testnet" === e ? o.testnet.P2SHVersion : o.livenet.P2SHVersion, a = new i(u, s), h = a.as("base58");
                return {script: r, scriptBufHex: r.getBuffer().toString("hex"), hash: s, address: h}
            }, e.prototype.setUnspent = function (t) {
                return this.vanilla.utxos = JSON.stringify(t), this.utxos = t, this
            }, e.prototype._setInputMap = function () {
                for (var e = [], i = this.selectedUtxos.length, n = 0; i > n; n++) {
                    var s = this.selectedUtxos[n], u = new t(s.scriptPubKey, "hex"), o = new r(u), a = o.classify();
                    if (a === r.TX_UNKNOWN)throw new Error("unkown output type at:" + n + " Type:" + o.getRawOutType());
                    e.push({address: s.address, scriptPubKey: o, scriptType: a, i: n})
                }
                return this.inputMap = e, this
            }, e.prototype.getSelectedUnspent = function () {
                return this.selectedUtxos
            }, e.prototype._selectUnspent = function (t) {
                if (!this.utxos || !this.utxos.length)throw new Error("unspent not set");
                var e = [6, 1];
                this.spendUnconfirmed && e.push(0);
                var i = [], r = s(0), u = !1, o = null, a = this.utxos.length;
                do {
                    for (var h = e.shift(), p = 0; a > p; p++) {
                        var c = this.utxos[p], f = c.confirmations || 0;
                        if (!(h > f || o && f >= o)) {
                            var g = c.amountSat || n.parseValue(c.amount);
                            if (r = r.add(g), i.push(c), r.cmp(t) >= 0) {
                                u = !0;
                                break
                            }
                        }
                    }
                    o = h
                } while (!u && e.length);
                if (!u)throw new Error("not enough unspent tx outputs to fulfill totalNeededAmount [SAT]:" + t);
                return this.selectedUtxos = i, this._setInputMap(), this
            }, e.prototype._setInputs = function (e) {
                var i = this.selectedUtxos, r = i.length, o = s(0);
                e.ins = [];
                for (var a = 0; r > a; a++) {
                    o = o.add(n.parseValue(i[a].amount));
                    var h = {};
                    h.s = n.EMPTY_BUFFER, h.q = 4294967295;
                    var p = new t(i[a].txid, "hex"), c = u.reverse(p), f = parseInt(i[a].vout), g = new t(4);
                    g.writeUInt32LE(f, 0), h.o = t.concat([c, g]), e.ins.push(h)
                }
                return this.valueInSat = o, this
            }, e.prototype._setFee = function (t) {
                if ("undefined" == typeof this.valueOutSat)throw new Error("valueOutSat undefined");
                var e = this.valueOutSat.add(t);
                if (this.valueInSat.cmp(e) < 0) {
                    var i = this.valueInSat.toString(), r = e.toString();
                    throw new Error("transaction input amount is less than outputs: " + i + " < " + r + " [SAT]")
                }
                return this.feeSat = t, this
            }, e.prototype._setRemainder = function (t, i) {
                if ("undefined" == typeof this.valueInSat || "undefined" == typeof this.valueOutSat)throw new Error("valueInSat / valueOutSat undefined");
                var r = this.valueInSat.sub(this.valueOutSat).sub(this.feeSat), u = t.outs.length;
                if (this.remainderSat = s(0), u > i && t.outs.pop(), r.cmp(0) > 0) {
                    var o = this.remainderOut || this.selectedUtxos[0], a = n.bigIntToValue(r), h = e._scriptForOut(o), p = {
                        v: a,
                        s: h.getBuffer()
                    };
                    t.outs.push(p), this.remainderSat = r
                }
                return this
            }, e.prototype._setFeeAndRemainder = function (t) {
                var e, i = 500, r = t.outs.length;
                do {
                    e = parseInt(i / 1e3) + 1;
                    var n = this.givenFeeSat ? this.givenFeeSat : e * g, s = this.valueOutSat.add(n);
                    this._selectUnspent(s)._setInputs(t)._setFee(n)._setRemainder(t, r), i = new f(t).getSize()
                } while (i > 1e3 * (e + 1));
                return this
            }, e.prototype.setOutputs = function (t) {
                this.vanilla.outs = JSON.stringify(t);
                var i = s(0), r = {};
                r.version = 1, r.lock_time = this.lockTime || 0, r.ins = [], r.outs = [];
                for (var u = t.length, o = 0; u > o; o++) {
                    var a = t[o].amountSat || t[o].amountSatStr ? s(t[o].amountSatStr) : n.parseValue(t[o].amount), h = n.bigIntToValue(a), p = e._scriptForOut(t[o]), c = {
                        v: h,
                        s: p.getBuffer()
                    };
                    r.outs.push(c), i = i.add(a)
                }
                return this.valueOutSat = i, this._setFeeAndRemainder(r), this.tx = new f(r), this
            }, e._mapKeys = function (t) {
                for (var e, i = {}, r = t.length, n = 0; r > n; n++) {
                    var s = t[n];
                    if ("string" == typeof s) {
                        var u = new h(s);
                        e = new a({network: u.network()}), e.fromObj({priv: s})
                    } else {
                        if (!(s instanceof a))throw new Error("argument must be an array of strings (WIF format) or WalletKey objects");
                        e = s
                    }
                    var o = e.storeObj().addr;
                    i[o] = e
                }
                return i
            }, e._signHashAndVerify = function (t, e) {
                var i, r = 10;
                do i = t.privKey.signSync(e); while (t.privKey.verifySignatureSync(e, i) === !1 && r--);
                if (0 > r)throw new Error("could not sign input: verification failed");
                return i
            }, e.prototype._checkTx = function () {
                if (!(this.tx && this.tx.ins && this.tx.ins.length && this.tx.outs.length))throw new Error("tx is not defined")
            }, e.prototype._multiFindKey = function (t, e) {
                var r;
                return [o.livenet, o.testnet].forEach(function (n) {
                    [n.addressVersion, n.P2SHVersion].forEach(function (n) {
                        var s = new i(n, e);
                        !r && t[s] && (r = t[s])
                    })
                }), r
            }, e.prototype._findWalletKey = function (t, e) {
                var i;
                if (e.address)i = t[e.address]; else if (e.pubKeyHash)i = this._multiFindKey(t, e.pubKeyHash); else {
                    if (!e.pubKeyBuf)throw new Error("no infomation at input to find keys");
                    var r = n.sha256ripe160(e.pubKeyBuf);
                    i = this._multiFindKey(t, r)
                }
                return i
            }, e.prototype._signPubKey = function (i, n, s) {
                if (this.tx.ins[n.i].s.length > 0)return {};
                var u = this._findWalletKey(i, n);
                if (u) {
                    var o = e._signHashAndVerify(u, s), a = new t(1);
                    a[0] = this.signhash;
                    var h = t.concat([o, a]), p = new r;
                    return p.chunks.push(h), p.updateBuffer(), {
                        inputFullySigned: !0,
                        signaturesAdded: 1,
                        script: p.getBuffer()
                    }
                }
            }, e.prototype._signPubKeyHash = function (i, n, s) {
                if (this.tx.ins[n.i].s.length > 0)return {};
                var u = this._findWalletKey(i, n);
                if (u) {
                    var o = e._signHashAndVerify(u, s), a = new t(1);
                    a[0] = this.signhash;
                    var h = t.concat([o, a]), p = new r;
                    return p.chunks.push(h), p.chunks.push(u.privKey.public), p.updateBuffer(), {
                        inputFullySigned: !0,
                        signaturesAdded: 1,
                        script: p.getBuffer()
                    }
                }
            }, e.prototype._chunkSignedWithKey = function (e, i, r) {
                var n, s = new p;
                s.public = r;
                for (var u = 1; u <= e.countSignatures(); u++) {
                    var o = e.chunks[u], a = new t(o.slice(0, o.length - 1));
                    s.verifySignatureSync(i, a) && (n = o)
                }
                return n
            }, e.prototype._getSignatureOrder = function (e, i, r, n) {
                for (var s = n.length, u = 0; s > u; u++) {
                    var o = new p;
                    if (o.public = new t(n[u], "hex"), o.verifySignatureSync(r, i))break
                }
                return u
            }, e.prototype._getNewSignatureOrder = function (e, i, r, n) {
                for (var s, u = 1; u <= i.countSignatures(); u++) {
                    var o = i.chunks[u], a = new t(o.slice(0, o.length - 1));
                    if (s = this._getSignatureOrder(e, a, r, n), s >= e)break
                }
                return e === s ? -1 : u - 1
            }, e.prototype._chunkIsEmpty = function (t) {
                return 0 === t || 0 === u.compare(t, n.EMPTY_BUFFER)
            }, e.prototype._initMultiSig = function (t) {
                var e = !1;
                return 0 !== t.chunks[0] && (t.prependOp0(), e = !0), e
            }, e.prototype._updateMultiSig = function (i, r, n, s, u) {
                var o = this._initMultiSig(n);
                if (this._chunkSignedWithKey(n, s, r.privKey.public))return null;
                var a = e._signHashAndVerify(r, s), h = new t(1);
                h[0] = this.signhash;
                var p = t.concat([a, h]), c = this._getNewSignatureOrder(i, n, s, u);
                return n.chunks.splice(c + 1, 0, p), n.updateBuffer(), o = !0, o ? n : null
            }, e.prototype._signMultiSig = function (t, e, i) {
                for (var n = e.scriptPubKey.capture(), s = e.scriptPubKey.chunks[0] - 80, u = n.length, o = this.tx.ins[e.i].s, a = new r(o), h = 0, p = 0; u > p && a.countSignatures() < s; p++) {
                    var c = this._findWalletKey(t, {pubKeyBuf: n[p]});
                    if (c) {
                        var f = this._updateMultiSig(p, c, a, i, n);
                        f && (a = f, h++)
                    }
                }
                var g = {inputFullySigned: a.countSignatures() === s, signaturesAdded: h, script: a.getBuffer()};
                return g
            };
            var S = {};
            e.prototype._scriptIsAppended = function (t, e) {
                var i = t.chunks.length;
                return void 0 === t.chunks[i - 1] ? !1 : "number" == typeof t.chunks[i - 1] ? !1 : 0 !== u.compare(t.chunks[i - 1], e) ? !1 : !0
            }, e.prototype._addScript = function (t, e) {
                var i = new r(t);
                return this._scriptIsAppended(i, e) || (i.chunks.push(e), i.updateBuffer()), i.getBuffer()
            }, e.prototype._getInputForP2sh = function (t, e) {
                var i, s = t.classify();
                switch (s) {
                    case r.TX_PUBKEYHASH:
                        i = t.captureOne();
                        break;
                    case r.TX_PUBKEY:
                        var u = t.captureOne();
                        i = n.sha256ripe160(u)
                }
                return {i: e, pubKeyHash: i, scriptPubKey: t, scriptType: s, isP2sh: !0}
            }, e.prototype._p2shInput = function (e) {
                if (!this.hashToScriptMap)throw new Error("hashToScriptMap not set");
                var i = this.hashToScriptMap[e.address];
                if (i) {
                    var n = new t(i, "hex"), s = new r(n), u = s.classify();
                    if (!S[u] || u === r.TX_SCRIPTHASH)throw new Error("dont know how to sign p2sh script type:" + s.getRawOutType());
                    return {
                        input: this._getInputForP2sh(s, e.i),
                        txSigHash: this.tx.hashForSignature(s, e.i, this.signhash),
                        scriptType: s.classify(),
                        scriptBuf: n
                    }
                }
            }, e.prototype._signScriptHash = function (t, e) {
                var i = this._p2shInput(e), r = S[i.scriptType].call(this, t, i.input, i.txSigHash);
                return r && r.script && r.signaturesAdded && (r.script = this._addScript(r.script, i.scriptBuf)), r
            }, S[r.TX_PUBKEYHASH] = e.prototype._signPubKeyHash, S[r.TX_PUBKEY] = e.prototype._signPubKey, S[r.TX_MULTISIG] = e.prototype._signMultiSig, S[r.TX_SCRIPTHASH] = e.prototype._signScriptHash, e.prototype.sign = function (t) {
                if (!(t instanceof Array))throw new Error("parameter should be an array");
                this._checkTx();
                for (var i = this.tx, r = i.ins, n = r.length, s = e._mapKeys(t), u = 0; n > u; u++) {
                    var o = this.inputMap[u], a = this.tx.hashForSignature(o.scriptPubKey, u, this.signhash), h = S[o.scriptType].call(this, s, o, a);
                    h && h.script && (this.vanilla.scriptSig[u] = h.script.toString("hex"), i.ins[u].s = h.script, h.inputFullySigned && this.inputsSigned++)
                }
                return this
            }, e.prototype.setHashToScriptMap = function (t) {
                return this.vanilla.hashToScriptMap = JSON.stringify(t), this.hashToScriptMap = t, this
            }, e.prototype.isFullySigned = function () {
                return this.inputsSigned === this.tx.ins.length
            }, e.prototype.build = function () {
                return this._checkTx(), this.tx
            }, e.prototype.toObj = function () {
                var t = {
                    version: l,
                    outs: JSON.parse(this.vanilla.outs),
                    utxos: JSON.parse(this.vanilla.utxos),
                    opts: JSON.parse(this.vanilla.opts),
                    scriptSig: this.vanilla.scriptSig
                };
                return this.vanilla.hashToScriptMap && (t.hashToScriptMap = JSON.parse(this.vanilla.hashToScriptMap)), t
            }, e.prototype._setScriptSig = function (e) {
                this.vanilla.scriptSig = e;
                for (var i in e) {
                    this.tx.ins[i].s = new t(e[i], "hex");
                    var n = new r(this.tx.ins[i].s);
                    n.finishedMultiSig() !== !1 && this.inputsSigned++
                }
            }, e.fromObj = function (t) {
                if (t.version !== l)throw new Error("Incompatible version at TransactionBuilder fromObj");
                var i = new e(t.opts);
                return t.utxos && (i.setUnspent(t.utxos), t.hashToScriptMap && i.setHashToScriptMap(t.hashToScriptMap), t.outs && (i.setOutputs(t.outs), t.scriptSig && i._setScriptSig(t.scriptSig))), i
            }, e.prototype._checkMergeability = function (t) {
                var e = ["opts", "hashToScriptMap", "outs", "uxtos"];
                for (var i in e) {
                    var r = e[i];
                    if (JSON.stringify(this.vanilla[r]) !== JSON.stringify(t.vanilla[r]))throw new Error("cannot merge: incompatible builders:" + r)
                }
            }, e.prototype._mergeInputSigP2sh = function (t, e, i) {
                for (var n = this._p2shInput(t), s = new r(n.scriptBuf), u = s.capture(), o = {}, a = u.length, h = 0; a > h; h++)this._chunkSignedWithKey(e, n.txSigHash, u[h]) && (o[u[h].toString("hex")] = 1);
                for (var p = [], h = 0; a > h; h++) {
                    var c = this._chunkSignedWithKey(i, n.txSigHash, u[h]), f = u[h].toString("hex");
                    c && !o[f] && p.push({prio: h, chunk: c, pubHex: f})
                }
                for (var h in p) {
                    var g = p[h], l = this._getNewSignatureOrder(g.prio, e, n.txSigHash, u);
                    e.chunks.splice(l + 1, 0, g.chunk)
                }
                return e.updateBuffer(), e.getBuffer()
            }, e.prototype._getSighashType = function (t) {
                return t[t.length - 1]
            }, e.prototype._checkSignHash = function (t) {
                for (var e = t.chunks.length - 1, i = 0; e > i; i++)if ((0 != i || 0 !== t.chunks[i]) && this._getSighashType(t.chunks[i]) !== this.signhash)throw new Error("signhash type mismatch at merge p2sh")
            }, e.prototype._mergeInputSig = function (t, e, i) {
                if (0 === u.compare(e, i))return e;
                var n = new r(e), s = new r(i), o = n.chunks.length, a = s.chunks.length;
                if (o && a && (2 > o && a > 2 || 2 > a && o > 2))throw new Error("TX sig types mismatch in merge");
                if (!o && !a || o && !a)return e;
                if (this._checkSignHash(s), !o && a)return i;
                var h = this.inputMap[t], p = h.scriptPubKey.classify();
                if (p === r.TX_PUBKEYHASH || p === r.TX_PUBKEY) {
                    {
                        new r(i)
                    }
                    return c.debug("Merging two signed inputs type:" + h.scriptPubKey.getRawOutType() + ". Signatures differs. Using the first version."), e
                }
                if (p !== r.TX_SCRIPTHASH)throw new Error("Script type:" + h.scriptPubKey.getRawOutType() + "not supported at #merge");
                return this._mergeInputSigP2sh(h, n, s)
            }, e.prototype._mergeTx = function (t) {
                var e = this.tx, i = t, r = e.ins.length;
                if (r !== i.ins.length)throw new Error("TX in length mismatch in merge");
                this.inputsSigned = 0;
                for (var n = 0; r > n; n++) {
                    var s = e.ins[n], o = i.ins[n];
                    if (s.q !== o.q)throw new Error("TX sequence ins mismatch in merge. Input:", n);
                    if (0 !== u.compare(s.o, o.o))throw new Error("TX .o in mismatch in merge. Input:", n);
                    s.s = this._mergeInputSig(n, s.s, o.s), this.vanilla.scriptSig[n] = s.s.toString("hex"), e.isInputComplete(n) && this.inputsSigned++
                }
            }, e.prototype.clone = function () {
                return new e.fromObj(this.toObj())
            }, e.prototype.merge = function (t) {
                var e = t.clone();
                if (this._checkMergeability(e), this.tx || e.tx) {
                    if (this.tx.getNormalizedHash().toString("hex") !== e.tx.getNormalizedHash().toString("hex"))throw new Error("mismatch at TransactionBuilder NTXID");
                    this._mergeTx(e.tx)
                }
            }, module.exports = e
        }).call(this, require("buffer").Buffer);
    }, {
        "../networks": "ULNIu2",
        "../util": 163,
        "../util/log": "AdF7pF",
        "./Address": "G+CcXD",
        "./Key": "ALJ4PS",
        "./PrivateKey": "izTl9z",
        "./Script": "hQ0t76",
        "./Transaction": "LJhYtm",
        "./WalletKey": "wWje7g",
        "bignum": 49,
        "buffer": 78,
        "buffertools": "fugeBw"
    }],
    "./lib/Wallet": [function (require, module, exports) {
        module.exports = require('yUY4WV');
    }, {}],
    "yUY4WV": [function (require, module, exports) {
        (function (t) {
            function e(t) {
                "object" != typeof t && (t = {}), this.datastore = JSON.parse(t.datastore ? JSON.stringify(t.datastore) : JSON.stringify(h)), this.network = void 0, this.dirty = t.dirty || !0
            }

            var r = function (e) {
                return new t(e, "hex")
            }, i = require("fs"), n = require("../util/EncFile"), s = require("./Address"), o = require("../networks"), a = require("../util"), d = "aes-256-cbc", h = {
                client: "libcoin",
                client_version: "0.0.1",
                network: "testnet",
                version: 1,
                best_hash: null,
                best_height: -1,
                keys: [],
                sin: {},
                scripts: {}
            };
            e.prototype.readSync = function (t, e) {
                this.datastore = n.readJFileSync(d, e, t), this.dirty = !1
            }, e.prototype.writeSync = function (t, e) {
                var r = t + ".tmp";
                n.writeJFileSync(d, e, r, this.datastore), i.renameSync(r, t), this.dirty = !1
            }, e.prototype.setNetwork = function (t) {
                switch (t || (t = this.datastore.network), t) {
                    case"mainnet":
                    case"livenet":
                        this.network = o.livenet;
                        break;
                    case"testnet":
                        this.network = o.testnet;
                        break;
                    default:
                        throw new Error("Unsupported network")
                }
                this.datastore.network = this.network.name, this.dirty = !0
            }, e.prototype.addKey = function (t) {
                this.datastore.keys.push(t), this.dirty = !0
            }, e.prototype.addSIN = function (t) {
                this.datastore.sin[t.sin] = t, this.dirty = !0
            }, e.prototype.findKeyHash = function (t) {
                for (var e = t.toString(), r = 0; r < this.datastore.keys.length; r++) {
                    var i = this.datastore.keys[r], n = i.addr, o = new s(n);
                    if (o.payload().toString() == e)return i
                }
                return void 0
            }, e.prototype.expandKey = function (t) {
                var e = new s(t);
                try {
                    e.validate();
                    var i = e.payload(), n = this.findKeyHash(i);
                    t = n.pub
                } catch (o) {
                }
                var a = /^[a-fA-F0-9]+$/;
                if (!t.match(a))throw new Error("Unknown key type");
                return r(t)
            }, e.prototype.expandKeys = function (t) {
                var e = [], r = this;
                return t.forEach(function (t) {
                    var i = r.expandKey(t);
                    e.push(i)
                }), e
            }, e.prototype.addScript = function (t) {
                var e = t.getBuffer(), r = a.sha256ripe160(e), i = new s(this.network.P2SHVersion, r), n = i.as("base58");
                return this.datastore.scripts[n] = e.toString("hex"), this.dirty = !0, n
            }, module.exports = e
        }).call(this, require("buffer").Buffer);
    }, {
        "../networks": "ULNIu2",
        "../util": 163,
        "../util/EncFile": 157,
        "./Address": "G+CcXD",
        "buffer": 78,
        "fs": 74
    }],
    "./lib/WalletKey": [function (require, module, exports) {
        module.exports = require('wWje7g');
    }, {}],
    "wWje7g": [function (require, module, exports) {
        (function (e) {
            function r(e) {
                e || (e = {}), this.network = e.network || o.livenet, this.created = e.created, this.privKey = e.privKey
            }

            var i = require("../util"), t = require("../util/time"), s = require("./Key"), p = require("./PrivateKey"), n = require("./Address"), o = require("../networks");
            r.prototype.generate = function () {
                this.privKey = s.generateSync(), this.created = t.curtime()
            }, r.prototype.storeObj = function () {
                var e = this.privKey.public.toString("hex"), r = i.sha256ripe160(this.privKey.public), t = new n(this.network.addressVersion, r), s = new p(this.network.privKeyVersion, this.privKey.private, this.privKey.compressed), o = {
                    created: this.created,
                    priv: s.toString(),
                    pub: e,
                    addr: t.toString()
                };
                return o
            }, r.prototype.fromObj = function (r) {
                if (this.created = r.created, this.privKey = new s, 64 == r.priv.length)this.privKey.private = new e(r.priv, "hex"), this.privKey.compressed = "undefined" == typeof r.compressed ? !0 : r.compressed; else {
                    var i = new p(r.priv);
                    i.validate(), this.privKey.private = new e(i.payload()), this.privKey.compressed = i.compressed()
                }
                this.privKey.regenerateSync()
            }, module.exports = r
        }).call(this, require("buffer").Buffer);
    }, {
        "../networks": "ULNIu2",
        "../util": 163,
        "../util/time": 166,
        "./Address": "G+CcXD",
        "./Key": "ALJ4PS",
        "./PrivateKey": "izTl9z",
        "buffer": 78
    }],
    49: [function (require, module, exports) {
        (function (t) {
            function e(t) {
                r.prototype["_" + t] = n.prototype[t];
                var e = function (e) {
                    return "string" == typeof e ? e = new n(e) : "number" == typeof e && (e = new n(e.toString())), this["_" + t](e)
                };
                r.prototype[t] = e
            }

            var n = require("bn.js"), r = function o(t) {
                return this instanceof o ? (arguments[0] = t, n.apply(this, arguments)) : new r(t)
            };
            r.prototype = n.prototype;
            var i = function (t, e) {
                for (var n = 0; n < t.length; n++)e[n] = t[t.length - 1 - n]
            };
            r.fromBuffer = function (e, n) {
                if ("undefined" != typeof n && "little" === n.endian) {
                    var o = new t(e.length);
                    i(e, o), e = o
                }
                var f = e.toString("hex");
                f.length % 2 && (f = "0" + f);
                var u = new r(f, 16);
                return u
            }, r.prototype.toBuffer = function (e) {
                var n;
                if (e && e.size) {
                    var r = this.toString(16);
                    r.length % 2 && (r = "0" + r);
                    var o = r.length / 2;
                    if (n = new t(r, "hex"), o == e.size)n = n; else if (o > e.size)n = n.slice(o - n.length, n.length); else if (o < e.size) {
                        for (var f = new t(e.size), u = 0; u < n.length; u++)f[f.length - 1 - u] = n[n.length - 1 - u];
                        for (var u = 0; u < e.size - o; u++)f[u] = 0;
                        n = f
                    }
                } else {
                    var r = this.toString(16);
                    r.length % 2 && (r = "0" + r), n = new t(r, "hex")
                }
                if ("undefined" != typeof e && "little" === e.endian) {
                    var p = new t(n.length);
                    i(n, p), n = p
                }
                return n
            }, n.prototype.gt = function (t) {
                return this.cmp(t) > 0
            }, n.prototype.lt = function (t) {
                return this.cmp(t) < 0
            }, e("add"), e("sub"), e("mul"), e("mod"), e("div"), e("cmp"), e("gt"), e("lt"), r.prototype.toNumber = function () {
                return parseInt(this.toString(10), 10)
            }, module.exports = r
        }).call(this, require("buffer").Buffer);
    }, {"bn.js": 71, "buffer": 78}],
    "./lib/ECIES": [function (require, module, exports) {
        module.exports = require('0Qraa1');
    }, {}],
    "0Qraa1": [function (require, module, exports) {
        (function (e) {
            "use strict";
            var t = require("../sjcl"), c = require("../common/ECIES");
            c.symmetricEncrypt = function (c, r, o) {
                var i = t.codec.hex.toBits(c.toString("hex")), s = t.codec.hex.toBits(r.toString("hex")), n = t.codec.hex.toBits(o.toString("hex"));
                t.beware["CBC mode is dangerous because it doesn't protect message integrity."]();
                var h = new t.cipher.aes(i), d = t.mode.cbc.encrypt(h, n, s), a = new e(t.codec.hex.fromBits(d), "hex"), x = e.concat([r, a]);
                return x
            }, c.symmetricDecrypt = function (c, r) {
                var o = t.codec.hex.toBits(c.toString("hex")), i = r.slice(0, 16), s = r.slice(16, r.length);
                t.beware["CBC mode is dangerous because it doesn't protect message integrity."]();
                var n = t.codec.hex.toBits(s.toString("hex")), h = t.codec.hex.toBits(i.toString("hex")), d = new t.cipher.aes(o), a = t.mode.cbc.decrypt(d, n, h), x = new e(t.codec.hex.fromBits(a), "hex");
                return x
            }, module.exports = c
        }).call(this, require("buffer").Buffer);
    }, {"../common/ECIES": 58, "../sjcl": "oLMOpG", "buffer": 78}],
    "ALJ4PS": [function (require, module, exports) {
        (function (e) {
            var r = require("../SecureRandom"), t = require("bignum"), i = require("elliptic"), n = require("./Point"), s = require("../common/Key"), o = (require("util"), function () {
                this._pub = null, this._compressed = !0
            });
            for (var u in s)s.hasOwnProperty(u) && (o[u] = s[u]);
            o.bufferToArray = function (e) {
                for (var r = [], t = e.length, i = 0; t > i; i++)r.push(e.readUInt8(i));
                return r
            };
            Object.defineProperty(o.prototype, "public", {
                set: function (r) {
                    if (!e.isBuffer(r))throw new Error("Arg should be a buffer");
                    var t = r[0];
                    this._compressed = 4 !== t, this._pub = r
                }, get: function () {
                    return this._pub
                }
            }), Object.defineProperty(o.prototype, "compressed", {
                set: function (r) {
                    var s = this._compressed;
                    if (this._compressed = !!r, s != this._compressed) {
                        {
                            this._pub
                        }
                        if (this._pub)if (this._compressed) {
                            var o = this._pub.slice(1, 33), u = this._pub.slice(33, 65), f = new t(o), c = new t(u), p = new n(f, c);
                            this._pub = p.toCompressedPubKey()
                        } else {
                            var a = i.curves.secp256k1, o = this._pub.slice(1, 33), h = 3 == this._pub[0] ? !0 : !1, p = a.curve.pointFromX(h, o), u = new e(p.y.toArray()), v = new t(o), y = new t(u), m = new n(v, y);
                            this._pub = m.toUncompressedPubKey()
                        }
                        !this._compressed
                    }
                }, get: function () {
                    return this._compressed
                }
            }), o.generateSync = function () {
                for (var e, n = i.curves.secp256k1; ;)if (e = r.getRandomBuffer(32), t.fromBuffer(e, {size: 32}).cmp(n.n) < 0)break;
                var s = new o;
                return s.private = e, s.regenerateSync(), s
            }, o.prototype.regenerateSync = function () {
                if (!this.private)throw new Error("Key does not have a private key set");
                var e = i.curves.secp256k1, r = (e.g, e.g.mul(this.private)), s = new t(r.x.toArray()), o = new t(r.y.toArray()), u = new n(s, o);
                return this._pub = this.compressed ? u.toCompressedPubKey() : u.toUncompressedPubKey(), this
            }, o.prototype.signSync = function (r) {
                i.curves.secp256k1;
                if (!this.private)throw new Error("Key does not have a private key set");
                if (!e.isBuffer(r) || 32 !== r.length)throw new Error("Arg should be a 32 bytes hash buffer");
                var n = new t(this.private), s = o.sign(r, n), u = o.rs2DER(s.r, s.s);
                return u
            }, o.prototype.verifySignature = function (e, r, t) {
                try {
                    var i = this.verifySignatureSync(e, r);
                    t(null, i)
                } catch (n) {
                    t(n)
                }
            }, o.prototype.verifySignatureSync = function (e, r) {
                var t = new i.ec(i.curves.secp256k1), n = e.toString("hex"), s = this._pub.toString("hex"), r = r.toString("hex"), o = t.verify(n, r, s);
                return o
            }, o.sign = function (e, r, i) {
                var s = r, u = n.getN(), f = new t(e);
                do var i = i || o.genk(), c = n.getG(), p = n.multiply(c, i), a = p.x.mod(u), h = i.invm(u).mul(f.add(s.mul(a))).mod(u); while (a.cmp(new t(0)) <= 0 || h.cmp(new t(0)) <= 0);
                return {r: a, s: h}
            }, o.signCompressed = function (r, i, s) {
                var u = o.sign(r, i, s), f = u.r, c = u.s, p = t.fromBuffer(r), a = n.getG(), h = n.multiply(a, i), v = o.calcPubKeyRecoveryParam(p, f, c, h), y = f.toBuffer({size: 32}), m = c.toBuffer({size: 32}), l = new e([v]), b = e.concat([l, y, m]);
                return b
            }, o.verifyCompressed = function (e, r) {
                if (65 !== r.length)throw new Error("Invalid length for sigbuf");
                var i = r[0];
                if (0 > i || i > 3)throw new Error("Invalid value for i");
                var n = r.slice(1, 33), s = r.slice(33, 65), u = t.fromBuffer(n), f = t.fromBuffer(s), c = o.rs2DER(u, f), p = t.fromBuffer(e), a = new o, h = o.recoverPubKey(p, u, f, i), v = h.toCompressedPubKey();
                return a.public = v, a.verifySignatureSync(e, c)
            }, module.exports = o
        }).call(this, require("buffer").Buffer);
    }, {
        "../SecureRandom": "p4SiC2",
        "../common/Key": 59,
        "./Point": "6tXgqr",
        "bignum": 49,
        "buffer": 78,
        "elliptic": 116,
        "util": 111
    }],
    "./lib/Key": [function (require, module, exports) {
        module.exports = require('ALJ4PS');
    }, {}],
    "6tXgqr": [function (require, module, exports) {
        (function (e) {
            "use strict";
            var r = (require("./Key"), require("bignum")), u = (require("assert"), require("elliptic")), i = require("../common/Point");
            i.add = function (e, r) {
                var t = u.curves.secp256k1, n = t.curve.point(e.x, e.y), s = t.curve.point(r.x, r.y), c = n.add(s), f = new i(c.x, c.y);
                return f
            }, i.multiply = function (t, n) {
                if (e.isBuffer(n) && 32 !== n.length)throw new Error("if x is a buffer, it must be 32 bytes");
                var s = u.curves.secp256k1, c = s.curve.point(t.x, t.y);
                "string" == typeof n && (n = new r(n));
                var f = c.mul(n), o = new i(f.x, f.y);
                return o
            }, module.exports = i
        }).call(this, require("buffer").Buffer);
    }, {"../common/Point": 60, "./Key": "ALJ4PS", "assert": 75, "bignum": 49, "buffer": 78, "elliptic": 116}],
    "./lib/Point": [function (require, module, exports) {
        module.exports = require('6tXgqr');
    }, {}],
    "p4SiC2": [function (require, module, exports) {
        (function (o) {
            var r = require("../common/SecureRandom");
            r.getRandomBuffer = function (r) {
                if (!window.crypto && !window.msCrypto)throw new Error("window.crypto not available");
                if (window.crypto && window.crypto.getRandomValues)var e = window.crypto; else {
                    if (!window.msCrypto || !window.msCrypto.getRandomValues)throw new Error("window.crypto.getRandomValues not available");
                    var e = window.msCrypto
                }
                var n = new Uint8Array(r);
                e.getRandomValues(n);
                var w = new o(n);
                return w
            }, module.exports = r
        }).call(this, require("buffer").Buffer);
    }, {"../common/SecureRandom": 61, "buffer": 78}],
    "./lib/SecureRandom": [function (require, module, exports) {
        module.exports = require('p4SiC2');
    }, {}],
    58: [function (require, module, exports) {
        (function (e) {
            "use strict";
            var r = require("../../util"), t = require("../Point"), i = require("../SecureRandom"), n = require("../Key"), c = function () {
            };
            c.encryptObj = function (e, r, t, n) {
                var s = new c;
                s.KB = e, s.message = r, t = s.getRandomSeed(t);
                var o = (s.R, s.S = s.getSfromPubkey()), u = c.kdf(o), a = s.kE = u.slice(0, 32), p = s.kM = u.slice(32, 64);
                n = n || i.getRandomBuffer(16);
                {
                    var f = s.c = c.symmetricEncrypt(a, n, r);
                    s.d = c.mac(p, f)
                }
                return s
            }, c.encrypt = function (r, t, i, s) {
                var o = c.encryptObj(r, t, i, s), u = new n;
                u.compressed = !1, u.public = o.R.toUncompressedPubKey(), u.compressed = !0;
                var a = u.public, p = e.concat([a, o.c, o.d]);
                return p
            }, c.decryptObj = function (e) {
                var r = e.kB, i = e.R, n = e.c, s = e.d, o = t.multiply(i, r), u = o.x.toBuffer({size: 32}), a = c.kdf(u), p = e.kE = a.slice(0, 32), f = e.kM = a.slice(32, 64), y = c.mac(f, n);
                if (s.toString("hex") !== y.toString("hex"))throw new Error("MAC check incorrect. Data is invalid.");
                var h = c.symmetricDecrypt(p, n);
                return h
            }, c.decrypt = function (e, r) {
                if (r.length < 97)throw new Error("invalid length of encrypted data");
                var i = new c;
                i.kB = e;
                var s = r.slice(0, 33), o = new n;
                return o.public = s, o.compressed = !1, i.R = t.fromUncompressedPubKey(o.public), i.c = r.slice(33, r.length - 64), i.d = r.slice(r.length - 64, r.length), c.decryptObj(i)
            }, c.kdf = function (e) {
                var t = r.sha512(e);
                return t
            }, c.mac = function (e, t) {
                var i = r.sha512hmac(e, t);
                return i
            }, c.prototype.getRandomSeed = function (e) {
                return e ? (this.key = new n, this.key.private = e, this.key.regenerateSync()) : this.key = n.generateSync(), this.r = this.key.private, this.key.compressed = !1, this.R = t.fromUncompressedPubKey(this.key.public), this.r
            }, c.prototype.getSfromPubkey = function () {
                var e = new n;
                e.public = this.KB, e.compressed = !1;
                var r = t.fromUncompressedPubKey(e.public);
                return this.P = t.multiply(r, this.r), this.S = this.P.x.toBuffer({size: 32}), this.S
            }, c.prototype.getSfromPrivkey = function () {
                var e = this.R, r = this.kB, i = t.multiply(e, r), n = i.x.toBuffer({size: 32});
                return n
            }, module.exports = c
        }).call(this, require("buffer").Buffer);
    }, {"../../util": 163, "../Key": "ALJ4PS", "../Point": "6tXgqr", "../SecureRandom": "p4SiC2", "buffer": 78}],
    59: [function (require, module, exports) {
        (function (r) {
            var e = require("bignum"), n = require("../Point"), t = require("../SecureRandom"), e = require("bignum"), o = require("elliptic"), f = function () {
            };
            f.parseDERsig = function (n) {
                if (!r.isBuffer(n))throw new Error("DER formatted signature should be a buffer");
                var t = n[0];
                if (48 !== t)throw new Error("Header byte should be 0x30");
                var o = n[1];
                if (o !== n.slice(2).length)throw new Error("Length byte should length of what follows");
                var f = n[2];
                if (2 !== f)throw new Error("Integer byte for r should be 0x02");
                var i = n[3], u = n.slice(4, 4 + i), a = e.fromBuffer(u), c = 0 === n[4] ? !0 : !1;
                if (i !== u.length)throw new Error("Length of r incorrect");
                var h = n[4 + i + 0];
                if (2 !== h)throw new Error("Integer byte for s should be 0x02");
                var g = n[4 + i + 1], l = n.slice(4 + i + 2, 4 + i + 2 + g), s = e.fromBuffer(l), w = 0 === n[4 + i + 2 + 2] ? !0 : !1;
                if (g !== l.length)throw new Error("Length of s incorrect");
                var v = 4 + i + 2 + g;
                if (o !== v - 2)throw new Error("Length of signature incorrect");
                var d = {
                    header: t,
                    length: o,
                    rheader: f,
                    rlength: i,
                    rneg: c,
                    rbuf: u,
                    r: a,
                    sheader: h,
                    slength: g,
                    sneg: w,
                    sbuf: l,
                    s: s
                };
                return d
            }, f.rs2DER = function (e, n) {
                var t = e.toBuffer(), o = n.toBuffer(), f = 128 & t[0] ? !0 : !1, i = 128 & o[0] ? !0 : !1, u = f ? r.concat([new r([0]), t]) : t, a = i ? r.concat([new r([0]), o]) : o, c = 2 + u.length + 2 + a.length, h = u.length, g = a.length, l = 2, s = 2, w = 48, v = r.concat([new r([w, c, l, h]), u, new r([s, g]), a]);
                return v
            }, f.recoverPubKey = function (r, t, f, i) {
                var u = require("bn.js");
                if (i > 3 || 0 > i)throw new Error("Recovery param is more than two bits");
                r = new u(r.toBuffer({size: 32})), t = new u(t.toBuffer({size: 32})), f = new u(f.toBuffer({size: 32}));
                var a = o.curves.secp256k1, c = 1 & i, h = i >> 1, g = a.curve.n, l = a.curve.g, s = h ? t.add(g) : t, w = a.curve.pointFromX(c, s.toArray()), v = (w.mul(g), r.neg().mod(g)), d = t.invm(g), b = w.mul(f).add(l.mul(v)).mul(d);
                a.curve.validate(b);
                var m = new n;
                return m.x = e(b.x.toString()), m.y = e(b.y.toString()), m
            }, f.calcPubKeyRecoveryParam = function (r, e, n, t) {
                for (var o = 0; 4 > o; o++) {
                    var i = f.recoverPubKey(r, e, n, o);
                    if (i.x.toString() == t.x.toString() && i.y.toString() == t.y.toString())return o
                }
                throw new Error("Unable to find valid recovery factor")
            }, f.genk = function () {
                var r = new e(t.getRandomBuffer(32));
                return r
            }, module.exports = f
        }).call(this, require("buffer").Buffer);
    }, {"../Point": "6tXgqr", "../SecureRandom": "p4SiC2", "bignum": 49, "bn.js": 71, "buffer": 78, "elliptic": 116}],
    60: [function (require, module, exports) {
        (function (e) {
            var r = require("bignum"), F = function (e, r) {
                this.x = e, this.y = r
            }, f = r.fromBuffer(new e("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "hex"), {size: 32});
            F.getN = function () {
                return f
            };
            var t;
            F.getG = function () {
                return t = t || new F(r.fromBuffer(new e("79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "hex"), {size: 32}), r.fromBuffer(new e("483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", "hex"), {size: 32}))
            }, F.fromUncompressedPubKey = function (e) {
                var f = new F;
                return f.x = r.fromBuffer(e.slice(1, 33), {size: 32}), f.y = r.fromBuffer(e.slice(33, 65), {size: 32}), f
            }, F.prototype.toUncompressedPubKey = function () {
                var r = this.x.toBuffer({size: 32}), F = this.y.toBuffer({size: 32}), f = new e([4]), t = e.concat([f, r, F]);
                return t
            }, F.prototype.toCompressedPubKey = function () {
                var r = this.x.toBuffer({size: 32}), F = this.y.toBuffer({size: 32});
                if (F[F.length - 1] % 2)var f = e.concat([new e([3]), r]); else var f = e.concat([new e([2]), r]);
                return f
            }, module.exports = F
        }).call(this, require("buffer").Buffer);
    }, {"bignum": 49, "buffer": 78}],
    61: [function (require, module, exports) {
        (function (f) {
            var e = function () {
            };
            e.getRandomBuffer = function () {
            }, e.getPseudoRandomBuffer = function (e) {
                for (var n = 4294967296, o = new f(e), u = 0; e >= u; u++) {
                    var t = Math.floor(u / 4), a = u - 4 * t;
                    0 == a ? (r = Math.random() * n, o[u] = 255 & r) : o[u] = 255 & (r >>>= 8)
                }
                return o
            }, module.exports = e
        }).call(this, require("buffer").Buffer);
    }, {"buffer": 78}],
    "oLMOpG": [function (require, module, exports) {
        "use strict";
        function l(t) {
            throw t
        }

        function aa(t, e, s) {
            4 !== e.length && l(new sjcl.exception.invalid("invalid aes block size"));
            var i = t.a[s], n = e[0] ^ i[0], c = e[s ? 3 : 1] ^ i[1], r = e[2] ^ i[2];
            e = e[s ? 1 : 3] ^ i[3];
            var o, a, h, u, d = i.length / 4 - 2, p = 4, f = [0, 0, 0, 0];
            o = t.m[s], t = o[0];
            var m = o[1], j = o[2], g = o[3], y = o[4];
            for (u = 0; d > u; u++)o = t[n >>> 24] ^ m[c >> 16 & 255] ^ j[r >> 8 & 255] ^ g[255 & e] ^ i[p], a = t[c >>> 24] ^ m[r >> 16 & 255] ^ j[e >> 8 & 255] ^ g[255 & n] ^ i[p + 1], h = t[r >>> 24] ^ m[e >> 16 & 255] ^ j[n >> 8 & 255] ^ g[255 & c] ^ i[p + 2], e = t[e >>> 24] ^ m[n >> 16 & 255] ^ j[c >> 8 & 255] ^ g[255 & r] ^ i[p + 3], p += 4, n = o, c = a, r = h;
            for (u = 0; 4 > u; u++)f[s ? 3 & -u : u] = y[n >>> 24] << 24 ^ y[c >> 16 & 255] << 16 ^ y[r >> 8 & 255] << 8 ^ y[255 & e] ^ i[p++], o = n, n = c, c = r, r = e, e = o;
            return f
        }

        function ca(t, e) {
            var s, i = sjcl.random.A[t], n = [];
            for (s in i)i.hasOwnProperty(s) && n.push(i[s]);
            for (s = 0; s < n.length; s++)n[s](e)
        }

        function U(t) {
            window && window.performance && "function" == typeof window.performance.now ? sjcl.random.addEntropy(window.performance.now(), t, "loadtime") : sjcl.random.addEntropy((new Date).valueOf(), t, "loadtime")
        }

        function ba(t) {
            t.a = S(t).concat(S(t)), t.B = new sjcl.cipher.aes(t.a)
        }

        function S(t) {
            for (var e = 0; 4 > e && (t.i[e] = t.i[e] + 1 | 0, !t.i[e]); e++);
            return t.B.encrypt(t.i)
        }

        function T(t, e) {
            return function () {
                e.apply(t, arguments)
            }
        }

        var s = void 0, v = !1, sjcl = {
            cipher: {},
            hash: {},
            keyexchange: {},
            mode: {},
            misc: {},
            codec: {},
            exception: {
                corrupt: function (t) {
                    this.toString = function () {
                        return "CORRUPT: " + this.message
                    }, this.message = t
                }, invalid: function (t) {
                    this.toString = function () {
                        return "INVALID: " + this.message
                    }, this.message = t
                }, bug: function (t) {
                    this.toString = function () {
                        return "BUG: " + this.message
                    }, this.message = t
                }, notReady: function (t) {
                    this.toString = function () {
                        return "NOT READY: " + this.message
                    }, this.message = t
                }
            }
        };
        "undefined" != typeof module && module.exports && (module.exports = sjcl), sjcl.cipher.aes = function (t) {
            this.m[0][0][0] || this.q();
            var e, s, i, n, c = this.m[0][4], r = this.m[1];
            e = t.length;
            var o = 1;
            for (4 !== e && 6 !== e && 8 !== e && l(new sjcl.exception.invalid("invalid aes key size")), this.a = [i = t.slice(0), n = []], t = e; 4 * e + 28 > t; t++)s = i[t - 1], (0 === t % e || 8 === e && 4 === t % e) && (s = c[s >>> 24] << 24 ^ c[s >> 16 & 255] << 16 ^ c[s >> 8 & 255] << 8 ^ c[255 & s], 0 === t % e && (s = s << 8 ^ s >>> 24 ^ o << 24, o = o << 1 ^ 283 * (o >> 7))), i[t] = i[t - e] ^ s;
            for (e = 0; t; e++, t--)s = i[3 & e ? t : t - 4], n[e] = 4 >= t || 4 > e ? s : r[0][c[s >>> 24]] ^ r[1][c[s >> 16 & 255]] ^ r[2][c[s >> 8 & 255]] ^ r[3][c[255 & s]]
        }, sjcl.cipher.aes.prototype = {
            encrypt: function (t) {
                return aa(this, t, 0)
            }, decrypt: function (t) {
                return aa(this, t, 1)
            }, m: [[[], [], [], [], []], [[], [], [], [], []]], q: function () {
                var t, e, s, i, n, c, r, o = this.m[0], a = this.m[1], l = o[4], h = a[4], u = [], d = [];
                for (t = 0; 256 > t; t++)d[(u[t] = t << 1 ^ 283 * (t >> 7)) ^ t] = t;
                for (e = s = 0; !l[e]; e ^= i || 1, s = d[s] || 1)for (c = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4, c = c >> 8 ^ 255 & c ^ 99, l[e] = c, h[c] = e, n = u[t = u[i = u[e]]], r = 16843009 * n ^ 65537 * t ^ 257 * i ^ 16843008 * e, n = 257 * u[c] ^ 16843008 * c, t = 0; 4 > t; t++)o[t][e] = n = n << 24 ^ n >>> 8, a[t][c] = r = r << 24 ^ r >>> 8;
                for (t = 0; 5 > t; t++)o[t] = o[t].slice(0), a[t] = a[t].slice(0)
            }
        }, sjcl.bitArray = {
            bitSlice: function (t, e, i) {
                return t = sjcl.bitArray.O(t.slice(e / 32), 32 - (31 & e)).slice(1), i === s ? t : sjcl.bitArray.clamp(t, i - e)
            }, extract: function (t, e, s) {
                var i = Math.floor(-e - s & 31);
                return (-32 & (e + s - 1 ^ e) ? t[e / 32 | 0] << 32 - i ^ t[e / 32 + 1 | 0] >>> i : t[e / 32 | 0] >>> i) & (1 << s) - 1
            }, concat: function (t, e) {
                if (0 === t.length || 0 === e.length)return t.concat(e);
                var s = t[t.length - 1], i = sjcl.bitArray.getPartial(s);
                return 32 === i ? t.concat(e) : sjcl.bitArray.O(e, i, 0 | s, t.slice(0, t.length - 1))
            }, bitLength: function (t) {
                var e = t.length;
                return 0 === e ? 0 : 32 * (e - 1) + sjcl.bitArray.getPartial(t[e - 1])
            }, clamp: function (t, e) {
                if (32 * t.length < e)return t;
                t = t.slice(0, Math.ceil(e / 32));
                var s = t.length;
                return e &= 31, s > 0 && e && (t[s - 1] = sjcl.bitArray.partial(e, t[s - 1] & 2147483648 >> e - 1, 1)), t
            }, partial: function (t, e, s) {
                return 32 === t ? e : (s ? 0 | e : e << 32 - t) + 1099511627776 * t
            }, getPartial: function (t) {
                return Math.round(t / 1099511627776) || 32
            }, equal: function (t, e) {
                if (sjcl.bitArray.bitLength(t) !== sjcl.bitArray.bitLength(e))return v;
                var s, i = 0;
                for (s = 0; s < t.length; s++)i |= t[s] ^ e[s];
                return 0 === i
            }, O: function (t, e, i, n) {
                var c;
                for (c = 0, n === s && (n = []); e >= 32; e -= 32)n.push(i), i = 0;
                if (0 === e)return n.concat(t);
                for (c = 0; c < t.length; c++)n.push(i | t[c] >>> e), i = t[c] << 32 - e;
                return c = t.length ? t[t.length - 1] : 0, t = sjcl.bitArray.getPartial(c), n.push(sjcl.bitArray.partial(e + t & 31, e + t > 32 ? i : n.pop(), 1)), n
            }, t: function (t, e) {
                return [t[0] ^ e[0], t[1] ^ e[1], t[2] ^ e[2], t[3] ^ e[3]]
            }
        }, sjcl.codec.utf8String = {
            fromBits: function (t) {
                var e, s, i = "", n = sjcl.bitArray.bitLength(t);
                for (e = 0; n / 8 > e; e++)0 === (3 & e) && (s = t[e / 4]), i += String.fromCharCode(s >>> 24), s <<= 8;
                return decodeURIComponent(escape(i))
            }, toBits: function (t) {
                t = unescape(encodeURIComponent(t));
                var e, s = [], i = 0;
                for (e = 0; e < t.length; e++)i = i << 8 | t.charCodeAt(e), 3 === (3 & e) && (s.push(i), i = 0);
                return 3 & e && s.push(sjcl.bitArray.partial(8 * (3 & e), i)), s
            }
        }, sjcl.codec.hex = {
            fromBits: function (t) {
                var e, s = "";
                for (e = 0; e < t.length; e++)s += ((0 | t[e]) + 0xf00000000000).toString(16).substr(4);
                return s.substr(0, sjcl.bitArray.bitLength(t) / 4)
            }, toBits: function (t) {
                var e, s, i = [];
                for (t = t.replace(/\s|0x/g, ""), s = t.length, t += "00000000", e = 0; e < t.length; e += 8)i.push(0 ^ parseInt(t.substr(e, 8), 16));
                return sjcl.bitArray.clamp(i, 4 * s)
            }
        }, sjcl.codec.base64 = {
            I: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            fromBits: function (t, e, s) {
                var i = "", n = 0, c = sjcl.codec.base64.I, r = 0, o = sjcl.bitArray.bitLength(t);
                for (s && (c = c.substr(0, 62) + "-_"), s = 0; 6 * i.length < o;)i += c.charAt((r ^ t[s] >>> n) >>> 26), 6 > n ? (r = t[s] << 6 - n, n += 26, s++) : (r <<= 6, n -= 6);
                for (; 3 & i.length && !e;)i += "=";
                return i
            },
            toBits: function (t, e) {
                t = t.replace(/\s|=/g, "");
                var s, i, n = [], c = 0, r = sjcl.codec.base64.I, o = 0;
                for (e && (r = r.substr(0, 62) + "-_"), s = 0; s < t.length; s++)i = r.indexOf(t.charAt(s)), 0 > i && l(new sjcl.exception.invalid("this isn't base64!")), c > 26 ? (c -= 26, n.push(o ^ i >>> c), o = i << 32 - c) : (c += 6, o ^= i << 32 - c);
                return 56 & c && n.push(sjcl.bitArray.partial(56 & c, o, 1)), n
            }
        }, sjcl.codec.base64url = {
            fromBits: function (t) {
                return sjcl.codec.base64.fromBits(t, 1, 1)
            }, toBits: function (t) {
                return sjcl.codec.base64.toBits(t, 1)
            }
        }, sjcl.hash.sha256 = function (t) {
            this.a[0] || this.q(), t ? (this.e = t.e.slice(0), this.d = t.d.slice(0), this.c = t.c) : this.reset()
        }, sjcl.hash.sha256.hash = function (t) {
            return (new sjcl.hash.sha256).update(t).finalize()
        }, sjcl.hash.sha256.prototype = {
            blockSize: 512, reset: function () {
                return this.e = this.j.slice(0), this.d = [], this.c = 0, this
            }, update: function (t) {
                "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t));
                var e, s = this.d = sjcl.bitArray.concat(this.d, t);
                for (e = this.c, t = this.c = e + sjcl.bitArray.bitLength(t), e = 512 + e & -512; t >= e; e += 512)this.p(s.splice(0, 16));
                return this
            }, finalize: function () {
                var t, e = this.d, s = this.e, e = sjcl.bitArray.concat(e, [sjcl.bitArray.partial(1, 1)]);
                for (t = e.length + 2; 15 & t; t++)e.push(0);
                for (e.push(Math.floor(this.c / 4294967296)), e.push(0 | this.c); e.length;)this.p(e.splice(0, 16));
                return this.reset(), s
            }, j: [], a: [], q: function () {
                function t(t) {
                    return 4294967296 * (t - Math.floor(t)) | 0
                }

                var e, s = 0, i = 2;
                t:for (; 64 > s; i++) {
                    for (e = 2; i >= e * e; e++)if (0 === i % e)continue t;
                    8 > s && (this.j[s] = t(Math.pow(i, .5))), this.a[s] = t(Math.pow(i, 1 / 3)), s++
                }
            }, p: function (t) {
                var e, s, i = t.slice(0), n = this.e, c = this.a, r = n[0], o = n[1], a = n[2], l = n[3], h = n[4], u = n[5], d = n[6], p = n[7];
                for (t = 0; 64 > t; t++)16 > t ? e = i[t] : (e = i[t + 1 & 15], s = i[t + 14 & 15], e = i[15 & t] = (e >>> 7 ^ e >>> 18 ^ e >>> 3 ^ e << 25 ^ e << 14) + (s >>> 17 ^ s >>> 19 ^ s >>> 10 ^ s << 15 ^ s << 13) + i[15 & t] + i[t + 9 & 15] | 0), e = e + p + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (d ^ h & (u ^ d)) + c[t], p = d, d = u, u = h, h = l + e | 0, l = a, a = o, o = r, r = e + (o & a ^ l & (o ^ a)) + (o >>> 2 ^ o >>> 13 ^ o >>> 22 ^ o << 30 ^ o << 19 ^ o << 10) | 0;
                n[0] = n[0] + r | 0, n[1] = n[1] + o | 0, n[2] = n[2] + a | 0, n[3] = n[3] + l | 0, n[4] = n[4] + h | 0, n[5] = n[5] + u | 0, n[6] = n[6] + d | 0, n[7] = n[7] + p | 0
            }
        }, sjcl.hash.sha512 = function (t) {
            this.a[0] || this.q(), t ? (this.e = t.e.slice(0), this.d = t.d.slice(0), this.c = t.c) : this.reset()
        }, sjcl.hash.sha512.hash = function (t) {
            return (new sjcl.hash.sha512).update(t).finalize()
        }, sjcl.hash.sha512.prototype = {
            blockSize: 1024,
            reset: function () {
                return this.e = this.j.slice(0), this.d = [], this.c = 0, this
            },
            update: function (t) {
                "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t));
                var e, s = this.d = sjcl.bitArray.concat(this.d, t);
                for (e = this.c, t = this.c = e + sjcl.bitArray.bitLength(t), e = 1024 + e & -1024; t >= e; e += 1024)this.p(s.splice(0, 32));
                return this
            },
            finalize: function () {
                var t, e = this.d, s = this.e, e = sjcl.bitArray.concat(e, [sjcl.bitArray.partial(1, 1)]);
                for (t = e.length + 4; 31 & t; t++)e.push(0);
                for (e.push(0), e.push(0), e.push(Math.floor(this.c / 4294967296)), e.push(0 | this.c); e.length;)this.p(e.splice(0, 32));
                return this.reset(), s
            },
            j: [],
            Y: [12372232, 13281083, 9762859, 1914609, 15106769, 4090911, 4308331, 8266105],
            a: [],
            $: [2666018, 15689165, 5061423, 9034684, 4764984, 380953, 1658779, 7176472, 197186, 7368638, 14987916, 16757986, 8096111, 1480369, 13046325, 6891156, 15813330, 5187043, 9229749, 11312229, 2818677, 10937475, 4324308, 1135541, 6741931, 11809296, 16458047, 15666916, 11046850, 698149, 229999, 945776, 13774844, 2541862, 12856045, 9810911, 11494366, 7844520, 15576806, 8533307, 15795044, 4337665, 16291729, 5553712, 15684120, 6662416, 7413802, 12308920, 13816008, 4303699, 9366425, 10176680, 13195875, 4295371, 6546291, 11712675, 15708924, 1519456, 15772530, 6568428, 6495784, 8568297, 13007125, 7492395, 2515356, 12632583, 14740254, 7262584, 1535930, 13146278, 16321966, 1853211, 294276, 13051027, 13221564, 1051980, 4080310, 6651434, 14088940, 4675607],
            q: function () {
                function t(t) {
                    return 4294967296 * (t - Math.floor(t)) | 0
                }

                function e(t) {
                    return 1099511627776 * (t - Math.floor(t)) & 255
                }

                var s, i = 0, n = 2;
                t:for (; 80 > i; n++) {
                    for (s = 2; n >= s * s; s++)if (0 === n % s)continue t;
                    8 > i && (this.j[2 * i] = t(Math.pow(n, .5)), this.j[2 * i + 1] = e(Math.pow(n, .5)) << 24 | this.Y[i]), this.a[2 * i] = t(Math.pow(n, 1 / 3)), this.a[2 * i + 1] = e(Math.pow(n, 1 / 3)) << 24 | this.$[i], i++
                }
            },
            p: function (t) {
                var e, s, i = t.slice(0), n = this.e, c = this.a, r = n[0], o = n[1], a = n[2], l = n[3], h = n[4], u = n[5], d = n[6], p = n[7], f = n[8], m = n[9], j = n[10], g = n[11], y = n[12], v = n[13], b = n[14], w = n[15], k = r, A = o, x = a, B = l, C = h, L = u, S = d, E = p, M = f, P = m, z = j, R = g, O = y, U = v, T = b, V = w;
                for (t = 0; 80 > t; t++) {
                    if (16 > t)e = i[2 * t], s = i[2 * t + 1]; else {
                        s = i[2 * (t - 15)];
                        var I = i[2 * (t - 15) + 1];
                        e = (I << 31 | s >>> 1) ^ (I << 24 | s >>> 8) ^ s >>> 7;
                        var q = (s << 31 | I >>> 1) ^ (s << 24 | I >>> 8) ^ (s << 25 | I >>> 7);
                        s = i[2 * (t - 2)];
                        var D = i[2 * (t - 2) + 1], I = (D << 13 | s >>> 19) ^ (s << 3 | D >>> 29) ^ s >>> 6, D = (s << 13 | D >>> 19) ^ (D << 3 | s >>> 29) ^ (s << 26 | D >>> 6), G = i[2 * (t - 7)], $ = i[2 * (t - 16)], K = i[2 * (t - 16) + 1];
                        s = q + i[2 * (t - 7) + 1], e = e + G + (q >>> 0 > s >>> 0 ? 1 : 0), s += D, e += I + (D >>> 0 > s >>> 0 ? 1 : 0), s += K, e += $ + (K >>> 0 > s >>> 0 ? 1 : 0)
                    }
                    i[2 * t] = e |= 0, i[2 * t + 1] = s |= 0;
                    var G = M & z ^ ~M & O, N = P & R ^ ~P & U, D = k & x ^ k & C ^ x & C, W = A & B ^ A & L ^ B & L, $ = (A << 4 | k >>> 28) ^ (k << 30 | A >>> 2) ^ (k << 25 | A >>> 7), K = (k << 4 | A >>> 28) ^ (A << 30 | k >>> 2) ^ (A << 25 | k >>> 7), Y = c[2 * t], F = c[2 * t + 1], I = V + ((M << 18 | P >>> 14) ^ (M << 14 | P >>> 18) ^ (P << 23 | M >>> 9)), q = T + ((P << 18 | M >>> 14) ^ (P << 14 | M >>> 18) ^ (M << 23 | P >>> 9)) + (V >>> 0 > I >>> 0 ? 1 : 0), I = I + N, q = q + (G + (N >>> 0 > I >>> 0 ? 1 : 0)), I = I + F, q = q + (Y + (F >>> 0 > I >>> 0 ? 1 : 0)), I = I + s, q = q + (e + (s >>> 0 > I >>> 0 ? 1 : 0));
                    s = K + W, e = $ + D + (K >>> 0 > s >>> 0 ? 1 : 0), T = O, V = U, O = z, U = R, z = M, R = P, P = E + I | 0, M = S + q + (E >>> 0 > P >>> 0 ? 1 : 0) | 0, S = C, E = L, C = x, L = B, x = k, B = A, A = I + s | 0, k = q + e + (I >>> 0 > A >>> 0 ? 1 : 0) | 0
                }
                o = n[1] = o + A | 0, n[0] = r + k + (A >>> 0 > o >>> 0 ? 1 : 0) | 0, l = n[3] = l + B | 0, n[2] = a + x + (B >>> 0 > l >>> 0 ? 1 : 0) | 0, u = n[5] = u + L | 0, n[4] = h + C + (L >>> 0 > u >>> 0 ? 1 : 0) | 0, p = n[7] = p + E | 0, n[6] = d + S + (E >>> 0 > p >>> 0 ? 1 : 0) | 0, m = n[9] = m + P | 0, n[8] = f + M + (P >>> 0 > m >>> 0 ? 1 : 0) | 0, g = n[11] = g + R | 0, n[10] = j + z + (R >>> 0 > g >>> 0 ? 1 : 0) | 0, v = n[13] = v + U | 0, n[12] = y + O + (U >>> 0 > v >>> 0 ? 1 : 0) | 0, w = n[15] = w + V | 0, n[14] = b + T + (V >>> 0 > w >>> 0 ? 1 : 0) | 0
            }
        }, sjcl.mode.ccm = {
            name: "ccm", encrypt: function (t, e, s, i, n) {
                var c, r = e.slice(0), o = sjcl.bitArray, a = o.bitLength(s) / 8, h = o.bitLength(r) / 8;
                for (n = n || 64, i = i || [], 7 > a && l(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")), c = 2; 4 > c && h >>> 8 * c; c++);
                return 15 - a > c && (c = 15 - a), s = o.clamp(s, 8 * (15 - c)), e = sjcl.mode.ccm.K(t, e, s, i, n, c), r = sjcl.mode.ccm.L(t, r, s, e, n, c), o.concat(r.data, r.tag)
            }, decrypt: function (t, e, s, i, n) {
                n = n || 64, i = i || [];
                var c = sjcl.bitArray, r = c.bitLength(s) / 8, o = c.bitLength(e), a = c.clamp(e, o - n), h = c.bitSlice(e, o - n), o = (o - n) / 8;
                for (7 > r && l(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")), e = 2; 4 > e && o >>> 8 * e; e++);
                return 15 - r > e && (e = 15 - r), s = c.clamp(s, 8 * (15 - e)), a = sjcl.mode.ccm.L(t, a, s, h, n, e), t = sjcl.mode.ccm.K(t, a.data, s, i, n, e), c.equal(a.tag, t) || l(new sjcl.exception.corrupt("ccm: tag doesn't match")), a.data
            }, K: function (t, e, s, i, n, c) {
                var r = [], o = sjcl.bitArray, a = o.t;
                if (n /= 8, (n % 2 || 4 > n || n > 16) && l(new sjcl.exception.invalid("ccm: invalid tag length")), (4294967295 < i.length || 4294967295 < e.length) && l(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")), c = [o.partial(8, (i.length ? 64 : 0) | n - 2 << 2 | c - 1)], c = o.concat(c, s), c[3] |= o.bitLength(e) / 8, c = t.encrypt(c), i.length)for (s = o.bitLength(i) / 8, 65279 >= s ? r = [o.partial(16, s)] : 4294967295 >= s && (r = o.concat([o.partial(16, 65534)], [s])), r = o.concat(r, i), i = 0; i < r.length; i += 4)c = t.encrypt(a(c, r.slice(i, i + 4).concat([0, 0, 0])));
                for (i = 0; i < e.length; i += 4)c = t.encrypt(a(c, e.slice(i, i + 4).concat([0, 0, 0])));
                return o.clamp(c, 8 * n)
            }, L: function (t, e, s, i, n, c) {
                var r, o = sjcl.bitArray;
                r = o.t;
                var a = e.length, l = o.bitLength(e);
                if (s = o.concat([o.partial(8, c - 1)], s).concat([0, 0, 0]).slice(0, 4), i = o.bitSlice(r(i, t.encrypt(s)), 0, n), !a)return {
                    tag: i,
                    data: []
                };
                for (r = 0; a > r; r += 4)s[3]++, n = t.encrypt(s), e[r] ^= n[0], e[r + 1] ^= n[1], e[r + 2] ^= n[2], e[r + 3] ^= n[3];
                return {tag: i, data: o.clamp(e, l)}
            }
        }, sjcl.beware === s && (sjcl.beware = {}), sjcl.beware["CBC mode is dangerous because it doesn't protect message integrity."] = function () {
            sjcl.mode.cbc = {
                name: "cbc", encrypt: function (t, e, s, i) {
                    i && i.length && l(new sjcl.exception.invalid("cbc can't authenticate data")), 128 !== sjcl.bitArray.bitLength(s) && l(new sjcl.exception.invalid("cbc iv must be 128 bits"));
                    var n = sjcl.bitArray, c = n.t, r = n.bitLength(e), o = 0, a = [];
                    for (7 & r && l(new sjcl.exception.invalid("pkcs#5 padding only works for multiples of a byte")), i = 0; r >= o + 128; i += 4, o += 128)s = t.encrypt(c(s, e.slice(i, i + 4))), a.splice(i, 0, s[0], s[1], s[2], s[3]);
                    return r = 16843009 * (16 - (r >> 3 & 15)), s = t.encrypt(c(s, n.concat(e, [r, r, r, r]).slice(i, i + 4))), a.splice(i, 0, s[0], s[1], s[2], s[3]), a
                }, decrypt: function (t, e, s, i) {
                    i && i.length && l(new sjcl.exception.invalid("cbc can't authenticate data")), 128 !== sjcl.bitArray.bitLength(s) && l(new sjcl.exception.invalid("cbc iv must be 128 bits")), (127 & sjcl.bitArray.bitLength(e) || !e.length) && l(new sjcl.exception.corrupt("cbc ciphertext must be a positive multiple of the block size"));
                    var n, c = sjcl.bitArray, r = c.t, o = [];
                    for (i = 0; i < e.length; i += 4)n = e.slice(i, i + 4), s = r(s, t.decrypt(n)), o.splice(i, 0, s[0], s[1], s[2], s[3]), s = n;
                    return n = 255 & o[i - 1], (0 === n || n > 16) && l(new sjcl.exception.corrupt("pkcs#5 padding corrupt")), s = 16843009 * n, c.equal(c.bitSlice([s, s, s, s], 0, 8 * n), c.bitSlice(o, 32 * o.length - 8 * n, 32 * o.length)) || l(new sjcl.exception.corrupt("pkcs#5 padding corrupt")), c.bitSlice(o, 0, 32 * o.length - 8 * n)
                }
            }
        }, sjcl.misc.hmac = function (t, e) {
            this.M = e = e || sjcl.hash.sha256;
            var s, i = [[], []], n = e.prototype.blockSize / 32;
            for (this.o = [new e, new e], t.length > n && (t = e.hash(t)), s = 0; n > s; s++)i[0][s] = 909522486 ^ t[s], i[1][s] = 1549556828 ^ t[s];
            this.o[0].update(i[0]), this.o[1].update(i[1]), this.G = new e(this.o[0])
        }, sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (t) {
            return this.P && l(new sjcl.exception.invalid("encrypt on already updated hmac called!")), this.update(t), this.digest(t)
        }, sjcl.misc.hmac.prototype.reset = function () {
            this.G = new this.M(this.o[0]), this.P = v
        }, sjcl.misc.hmac.prototype.update = function (t) {
            this.P = !0, this.G.update(t)
        }, sjcl.misc.hmac.prototype.digest = function () {
            var t = this.G.finalize(), t = new this.M(this.o[1]).update(t).finalize();
            return this.reset(), t
        }, sjcl.misc.pbkdf2 = function (t, e, s, i, n) {
            s = s || 1e3, (0 > i || 0 > s) && l(sjcl.exception.invalid("invalid params to pbkdf2")), "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t)), "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e)), n = n || sjcl.misc.hmac, t = new n(t);
            var c, r, o, a, h = [], u = sjcl.bitArray;
            for (a = 1; 32 * h.length < (i || 1); a++) {
                for (n = c = t.encrypt(u.concat(e, [a])), r = 1; s > r; r++)for (c = t.encrypt(c), o = 0; o < c.length; o++)n[o] ^= c[o];
                h = h.concat(n)
            }
            return i && (h = u.clamp(h, i)), h
        }, sjcl.prng = function (t) {
            this.f = [new sjcl.hash.sha256], this.k = [0], this.F = 0, this.s = {}, this.D = 0, this.J = {}, this.N = this.g = this.l = this.V = 0, this.a = [0, 0, 0, 0, 0, 0, 0, 0], this.i = [0, 0, 0, 0], this.B = s, this.C = t, this.r = v, this.A = {
                progress: {},
                seeded: {}
            }, this.n = this.U = 0, this.u = 1, this.w = 2, this.R = 65536, this.H = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024], this.S = 3e4, this.Q = 80
        }, sjcl.prng.prototype = {
            randomWords: function (t, e) {
                var s, i = [];
                s = this.isReady(e);
                var n;
                if (s === this.n && l(new sjcl.exception.notReady("generator isn't seeded")), s & this.w) {
                    s = !(s & this.u), n = [];
                    var c, r = 0;
                    for (this.N = n[0] = (new Date).valueOf() + this.S, c = 0; 16 > c; c++)n.push(4294967296 * Math.random() | 0);
                    for (c = 0; c < this.f.length && (n = n.concat(this.f[c].finalize()), r += this.k[c], this.k[c] = 0, !(!s && this.F & 1 << c)); c++);
                    for (this.F >= 1 << this.f.length && (this.f.push(new sjcl.hash.sha256), this.k.push(0)), this.g -= r, r > this.l && (this.l = r), this.F++, this.a = sjcl.hash.sha256.hash(this.a.concat(n)), this.B = new sjcl.cipher.aes(this.a), s = 0; 4 > s && (this.i[s] = this.i[s] + 1 | 0, !this.i[s]); s++);
                }
                for (s = 0; t > s; s += 4)0 === (s + 1) % this.R && ba(this), n = S(this), i.push(n[0], n[1], n[2], n[3]);
                return ba(this), i.slice(0, t)
            }, setDefaultParanoia: function (t, e) {
                0 === t && "Setting paranoia=0 will ruin your security; use it only for testing" !== e && l("Setting paranoia=0 will ruin your security; use it only for testing"), this.C = t
            }, addEntropy: function (t, e, i) {
                i = i || "user";
                var n, c, r = (new Date).valueOf(), o = this.s[i], a = this.isReady(), h = 0;
                switch (n = this.J[i], n === s && (n = this.J[i] = this.V++), o === s && (o = this.s[i] = 0), this.s[i] = (this.s[i] + 1) % this.f.length, typeof t) {
                    case"number":
                        e === s && (e = 1), this.f[o].update([n, this.D++, 1, e, r, 1, 0 | t]);
                        break;
                    case"object":
                        if (i = Object.prototype.toString.call(t), "[object Uint32Array]" === i) {
                            for (c = [], i = 0; i < t.length; i++)c.push(t[i]);
                            t = c
                        } else for ("[object Array]" !== i && (h = 1), i = 0; i < t.length && !h; i++)"number" != typeof t[i] && (h = 1);
                        if (!h) {
                            if (e === s)for (i = e = 0; i < t.length; i++)for (c = t[i]; c > 0;)e++, c >>>= 1;
                            this.f[o].update([n, this.D++, 2, e, r, t.length].concat(t))
                        }
                        break;
                    case"string":
                        e === s && (e = t.length), this.f[o].update([n, this.D++, 3, e, r, t.length]), this.f[o].update(t);
                        break;
                    default:
                        h = 1
                }
                h && l(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")), this.k[o] += e, this.g += e, a === this.n && (this.isReady() !== this.n && ca("seeded", Math.max(this.l, this.g)), ca("progress", this.getProgress()))
            }, isReady: function (t) {
                return t = this.H[t !== s ? t : this.C], this.l && this.l >= t ? this.k[0] > this.Q && (new Date).valueOf() > this.N ? this.w | this.u : this.u : this.g >= t ? this.w | this.n : this.n
            }, getProgress: function (t) {
                return t = this.H[t ? t : this.C], this.l >= t ? 1 : this.g > t ? 1 : this.g / t
            }, startCollectors: function () {
                this.r || (this.b = {
                    loadTimeCollector: T(this, this.aa),
                    mouseCollector: T(this, this.ba),
                    keyboardCollector: T(this, this.Z),
                    accelerometerCollector: T(this, this.T)
                }, window.addEventListener ? (window.addEventListener("load", this.b.loadTimeCollector, v), window.addEventListener("mousemove", this.b.mouseCollector, v), window.addEventListener("keypress", this.b.keyboardCollector, v), window.addEventListener("devicemotion", this.b.accelerometerCollector, v)) : document.attachEvent ? (document.attachEvent("onload", this.b.loadTimeCollector), document.attachEvent("onmousemove", this.b.mouseCollector), document.attachEvent("keypress", this.b.keyboardCollector)) : l(new sjcl.exception.bug("can't attach event")), this.r = !0)
            }, stopCollectors: function () {
                this.r && (window.removeEventListener ? (window.removeEventListener("load", this.b.loadTimeCollector, v), window.removeEventListener("mousemove", this.b.mouseCollector, v), window.removeEventListener("keypress", this.b.keyboardCollector, v), window.removeEventListener("devicemotion", this.b.accelerometerCollector, v)) : document.detachEvent && (document.detachEvent("onload", this.b.loadTimeCollector), document.detachEvent("onmousemove", this.b.mouseCollector), document.detachEvent("keypress", this.b.keyboardCollector)), this.r = v)
            }, addEventListener: function (t, e) {
                this.A[t][this.U++] = e
            }, removeEventListener: function (t, e) {
                var s, i, n = this.A[t], c = [];
                for (i in n)n.hasOwnProperty(i) && n[i] === e && c.push(i);
                for (s = 0; s < c.length; s++)i = c[s], delete n[i]
            }, Z: function () {
                U(1)
            }, ba: function (t) {
                sjcl.random.addEntropy([t.x || t.clientX || t.offsetX || 0, t.y || t.clientY || t.offsetY || 0], 2, "mouse"), U(0)
            }, aa: function () {
                U(2)
            }, T: function (t) {
                if (t = t.accelerationIncludingGravity.x || t.accelerationIncludingGravity.y || t.accelerationIncludingGravity.z, window.orientation) {
                    var e = window.orientation;
                    "number" == typeof e && sjcl.random.addEntropy(e, 1, "accelerometer")
                }
                t && sjcl.random.addEntropy(t, 2, "accelerometer"), U(0)
            }
        }, sjcl.random = new sjcl.prng(6);
        t:try {
            var V, da, $, ea;
            if (ea = "undefined" != typeof module) {
                var ja;
                if (ja = module.exports) {
                    var ka;
                    try {
                        ka = require("crypto")
                    } catch (na) {
                        ka = null
                    }
                    ja = (da = ka) && da.randomBytes
                }
                ea = ja
            }
            if (ea)V = da.randomBytes(128), V = new Uint32Array(new Uint8Array(V).buffer), sjcl.random.addEntropy(V, 1024, "crypto['randomBytes']"); else if (window && Uint32Array) {
                if ($ = new Uint32Array(32), window.crypto && window.crypto.getRandomValues)window.crypto.getRandomValues($); else {
                    if (!window.msCrypto || !window.msCrypto.getRandomValues)break t;
                    window.msCrypto.getRandomValues($)
                }
                sjcl.random.addEntropy($, 1024, "crypto['getRandomValues']")
            }
        } catch (oa) {
            "undefined" != typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(oa))
        }
        sjcl.json = {
            defaults: {v: 1, iter: 1e3, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes"},
            X: function (t, e, s, i) {
                s = s || {}, i = i || {};
                var n, c = sjcl.json, r = c.h({iv: sjcl.random.randomWords(4, 0)}, c.defaults);
                return c.h(r, s), s = r.adata, "string" == typeof r.salt && (r.salt = sjcl.codec.base64.toBits(r.salt)), "string" == typeof r.iv && (r.iv = sjcl.codec.base64.toBits(r.iv)), (!sjcl.mode[r.mode] || !sjcl.cipher[r.cipher] || "string" == typeof t && 100 >= r.iter || 64 !== r.ts && 96 !== r.ts && 128 !== r.ts || 128 !== r.ks && 192 !== r.ks && 256 !== r.ks || 2 > r.iv.length || 4 < r.iv.length) && l(new sjcl.exception.invalid("json encrypt: invalid parameters")), "string" == typeof t ? (n = sjcl.misc.cachedPbkdf2(t, r), t = n.key.slice(0, r.ks / 32), r.salt = n.salt) : sjcl.ecc && t instanceof sjcl.ecc.elGamal.publicKey && (n = t.kem(), r.kemtag = n.tag, t = n.key.slice(0, r.ks / 32)), "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e)), "string" == typeof s && (s = sjcl.codec.utf8String.toBits(s)), n = new sjcl.cipher[r.cipher](t), c.h(i, r), i.key = t, r.ct = sjcl.mode[r.mode].encrypt(n, e, r.iv, s, r.ts), r
            },
            encrypt: function () {
                var t = sjcl.json, e = t.X.apply(t, arguments);
                return t.encode(e)
            },
            W: function (t, e, s, i) {
                s = s || {}, i = i || {};
                var n = sjcl.json;
                e = n.h(n.h(n.h({}, n.defaults), e), s, !0);
                var c;
                return s = e.adata, "string" == typeof e.salt && (e.salt = sjcl.codec.base64.toBits(e.salt)), "string" == typeof e.iv && (e.iv = sjcl.codec.base64.toBits(e.iv)), (!sjcl.mode[e.mode] || !sjcl.cipher[e.cipher] || "string" == typeof t && 100 >= e.iter || 64 !== e.ts && 96 !== e.ts && 128 !== e.ts || 128 !== e.ks && 192 !== e.ks && 256 !== e.ks || !e.iv || 2 > e.iv.length || 4 < e.iv.length) && l(new sjcl.exception.invalid("json decrypt: invalid parameters")), "string" == typeof t ? (c = sjcl.misc.cachedPbkdf2(t, e), t = c.key.slice(0, e.ks / 32), e.salt = c.salt) : sjcl.ecc && t instanceof sjcl.ecc.elGamal.secretKey && (t = t.unkem(sjcl.codec.base64.toBits(e.kemtag)).slice(0, e.ks / 32)), "string" == typeof s && (s = sjcl.codec.utf8String.toBits(s)), c = new sjcl.cipher[e.cipher](t), s = sjcl.mode[e.mode].decrypt(c, e.ct, e.iv, s, e.ts), n.h(i, e), i.key = t, sjcl.codec.utf8String.fromBits(s)
            },
            decrypt: function (t, e, s, i) {
                var n = sjcl.json;
                return n.W(t, n.decode(e), s, i)
            },
            encode: function (t) {
                var e, s = "{", i = "";
                for (e in t)if (t.hasOwnProperty(e))switch (e.match(/^[a-z0-9]+$/i) || l(new sjcl.exception.invalid("json encode: invalid property name")), s += i + '"' + e + '":', i = ",", typeof t[e]) {
                    case"number":
                    case"boolean":
                        s += t[e];
                        break;
                    case"string":
                        s += '"' + escape(t[e]) + '"';
                        break;
                    case"object":
                        s += '"' + sjcl.codec.base64.fromBits(t[e], 0) + '"';
                        break;
                    default:
                        l(new sjcl.exception.bug("json encode: unsupported type"))
                }
                return s + "}"
            },
            decode: function (t) {
                t = t.replace(/\s/g, ""), t.match(/^\{.*\}$/) || l(new sjcl.exception.invalid("json decode: this isn't json!")), t = t.replace(/^\{|\}$/g, "").split(/,/);
                var e, s, i = {};
                for (e = 0; e < t.length; e++)(s = t[e].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)) || l(new sjcl.exception.invalid("json decode: this isn't json!")), i[s[2]] = s[3] ? parseInt(s[3], 10) : s[2].match(/^(ct|salt|iv)$/) ? sjcl.codec.base64.toBits(s[4]) : unescape(s[4]);
                return i
            },
            h: function (t, e, i) {
                if (t === s && (t = {}), e === s)return t;
                for (var n in e)e.hasOwnProperty(n) && (i && t[n] !== s && t[n] !== e[n] && l(new sjcl.exception.invalid("required parameter overridden")), t[n] = e[n]);
                return t
            },
            ea: function (t, e) {
                var s, i = {};
                for (s in t)t.hasOwnProperty(s) && t[s] !== e[s] && (i[s] = t[s]);
                return i
            },
            da: function (t, e) {
                var i, n = {};
                for (i = 0; i < e.length; i++)t[e[i]] !== s && (n[e[i]] = t[e[i]]);
                return n
            }
        }, sjcl.encrypt = sjcl.json.encrypt, sjcl.decrypt = sjcl.json.decrypt, sjcl.misc.ca = {}, sjcl.misc.cachedPbkdf2 = function (t, e) {
            var i, n = sjcl.misc.ca;
            return e = e || {}, i = e.iter || 1e3, n = n[t] = n[t] || {}, i = n[i] = n[i] || {firstSalt: e.salt && e.salt.length ? e.salt.slice(0) : sjcl.random.randomWords(2, 0)}, n = e.salt === s ? i.firstSalt : e.salt, i[n] = i[n] || sjcl.misc.pbkdf2(t, n, e.iter), {
                key: i[n].slice(0),
                salt: n.slice(0)
            }
        };
    }, {"crypto": 82}],
    "./lib/sjcl": [function (require, module, exports) {
        module.exports = require('oLMOpG');
    }, {}],
    "ULNIu2": [function (require, module, exports) {
        (function (e) {
            var t = (require("bufferput"), require("buffertools")), s = function (t) {
                return new e(t, "hex")
            };
            exports.livenet = {
                name: "livenet",
                magic: s("f9beb4d9"),
                addressVersion: 0,
                privKeyVersion: 128,
                P2SHVersion: 5,
                hkeyPublicVersion: 76067358,
                hkeyPrivateVersion: 76066276,
                genesisBlock: {
                    hash: s("6FE28C0AB6F1B372C1A6A246AE63F74F931E8365E15A089C68D6190000000000"),
                    merkle_root: s("3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A"),
                    height: 0,
                    nonce: 2083236893,
                    version: 1,
                    prev_hash: t.fill(new e(32), 0),
                    timestamp: 1231006505,
                    bits: 486604799
                },
                dnsSeeds: ["seed.bitcoin.sipa.be", "dnsseed.bluematt.me", "dnsseed.bitcoin.dashjr.org", "seed.bitcoinstats.com", "seed.bitnodes.io", "bitseed.xf2.org"],
                defaultClientPort: 8333
            }, exports.mainnet = exports.livenet, exports.testnet = {
                name: "testnet",
                magic: s("0b110907"),
                addressVersion: 111,
                privKeyVersion: 239,
                P2SHVersion: 196,
                hkeyPublicVersion: 70617039,
                hkeyPrivateVersion: 70615956,
                genesisBlock: {
                    hash: s("43497FD7F826957108F4A30FD9CEC3AEBA79972084E90EAD01EA330900000000"),
                    merkle_root: s("3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A"),
                    height: 0,
                    nonce: 414098458,
                    version: 1,
                    prev_hash: t.fill(new e(32), 0),
                    timestamp: 1296688602,
                    bits: 486604799
                },
                dnsSeeds: ["testnet-seed.bitcoin.petertodd.org", "testnet-seed.bluematt.me"],
                defaultClientPort: 18333
            }
        }).call(this, require("buffer").Buffer);
    }, {"buffer": 78, "bufferput": "aXRuS6", "buffertools": "fugeBw"}],
    "./networks": [function (require, module, exports) {
        module.exports = require('ULNIu2');
    }, {}],
    66: [function (require, module, exports) {
        (function (t) {
            function n(t) {
                for (var n = 0, e = 0; e < t.length; e++)n += Math.pow(256, e) * t[e];
                return n
            }

            function e(t) {
                for (var n = 0, e = 0; e < t.length; e++)n += Math.pow(256, t.length - e - 1) * t[e];
                return n
            }

            function r(t) {
                var n = e(t);
                return 128 == (128 & t[0]) && (n -= Math.pow(256, t.length)), n
            }

            function o(t) {
                var e = n(t);
                return 128 == (128 & t[t.length - 1]) && (e -= Math.pow(256, t.length)), e
            }

            function i(t) {
                var i = {};
                return [1, 2, 4, 8].forEach(function (u) {
                    var s = 8 * u;
                    i["word" + s + "le"] = i["word" + s + "lu"] = t(u, n), i["word" + s + "ls"] = t(u, o), i["word" + s + "be"] = i["word" + s + "bu"] = t(u, e), i["word" + s + "bs"] = t(u, r)
                }), i.word8 = i.word8u = i.word8be, i.word8s = i.word8bs, i
            }

            var u = require("chainsaw"), s = require("events").EventEmitter, f = require("buffers"), c = require("./lib/vars.js"), l = require("stream").Stream;
            exports = module.exports = function (n, e) {
                if (t.isBuffer(n))return exports.parse(n);
                var r = exports.stream();
                return n && n.pipe ? n.pipe(r) : n && (n.on(e || "data", function (t) {
                    r.write(t)
                }), n.on("end", function () {
                    r.end()
                })), r
            }, exports.stream = function (n) {
                function e(t, n, e) {
                    a = {
                        bytes: t, skip: e, cb: function (t) {
                            a = null, n(t)
                        }
                    }, r()
                }

                function r() {
                    if (!a)return void(b && (w = !0));
                    if ("function" == typeof a)a(); else {
                        var t = p + a.bytes;
                        if (g.length >= t) {
                            var n;
                            null == p ? (n = g.splice(0, t), a.skip || (n = n.slice())) : (a.skip || (n = g.slice(p, t)), p = t), a.skip ? a.cb() : a.cb(n)
                        }
                    }
                }

                function o(n) {
                    function o() {
                        w || n.next()
                    }

                    var u = i(function (t, n) {
                        return function (r) {
                            e(t, function (t) {
                                v.set(r, n(t)), o()
                            })
                        }
                    });
                    return u.tap = function (t) {
                        n.nest(t, v.store)
                    }, u.into = function (t, e) {
                        v.get(t) || v.set(t, {});
                        var r = v;
                        v = c(r.get(t)), n.nest(function () {
                            e.apply(this, arguments), this.tap(function () {
                                v = r
                            })
                        }, v.store)
                    }, u.flush = function () {
                        v.store = {}, o()
                    }, u.loop = function (t) {
                        var e = !1;
                        n.nest(!1, function r() {
                            this.vars = v.store, t.call(this, function () {
                                e = !0, o()
                            }, v.store), this.tap(function () {
                                e ? n.next() : r.call(this)
                            }.bind(this))
                        }, v.store)
                    }, u.buffer = function (t, n) {
                        "string" == typeof n && (n = v.get(n)), e(n, function (n) {
                            v.set(t, n), o()
                        })
                    }, u.skip = function (t) {
                        "string" == typeof t && (t = v.get(t)), e(t, function () {
                            o()
                        })
                    }, u.scan = function (n, e) {
                        if ("string" == typeof e)e = new t(e); else if (!t.isBuffer(e))throw new Error("search must be a Buffer or a string");
                        var i = 0;
                        a = function () {
                            var t = g.indexOf(e, p + i), u = t - p - i;
                            -1 !== t ? (a = null, null != p ? (v.set(n, g.slice(p, p + i + u)), p += i + u + e.length) : (v.set(n, g.slice(0, i + u)), g.splice(0, i + u + e.length)), o(), r()) : u = Math.max(g.length - e.length - p - i, 0), i += u
                        }, r()
                    }, u.peek = function (t) {
                        p = 0, n.nest(function () {
                            t.call(this, v.store), this.tap(function () {
                                p = null
                            })
                        })
                    }, u
                }

                if (n)return exports.apply(null, arguments);
                var a = null, p = null, h = u.light(o);
                h.writable = !0;
                var g = f();
                h.write = function (t) {
                    g.push(t), r()
                };
                var v = c(), w = !1, b = !1;
                return h.end = function () {
                    b = !0
                }, h.pipe = l.prototype.pipe, Object.getOwnPropertyNames(s.prototype).forEach(function (t) {
                    h[t] = s.prototype[t]
                }), h
            }, exports.parse = function (n) {
                var e = i(function (t, i) {
                    return function (u) {
                        if (r + t <= n.length) {
                            var s = n.slice(r, r + t);
                            r += t, o.set(u, i(s))
                        } else o.set(u, null);
                        return e
                    }
                }), r = 0, o = c();
                return e.vars = o.store, e.tap = function (t) {
                    return t.call(e, o.store), e
                }, e.into = function (t, n) {
                    o.get(t) || o.set(t, {});
                    var r = o;
                    return o = c(r.get(t)), n.call(e, o.store), o = r, e
                }, e.loop = function (t) {
                    for (var n = !1, r = function () {
                        n = !0
                    }; n === !1;)t.call(e, r, o.store);
                    return e
                }, e.buffer = function (t, i) {
                    "string" == typeof i && (i = o.get(i));
                    var u = n.slice(r, Math.min(n.length, r + i));
                    return r += i, o.set(t, u), e
                }, e.skip = function (t) {
                    return "string" == typeof t && (t = o.get(t)), r += t, e
                }, e.scan = function (i, u) {
                    if ("string" == typeof u)u = new t(u); else if (!t.isBuffer(u))throw new Error("search must be a Buffer or a string");
                    o.set(i, null);
                    for (var s = 0; s + r <= n.length - u.length + 1; s++) {
                        for (var f = 0; f < u.length && n[r + s + f] === u[f]; f++);
                        if (f === u.length)break
                    }
                    return o.set(i, n.slice(r, r + s)), r += s + u.length, e
                }, e.peek = function (t) {
                    var n = r;
                    return t.call(e, o.store), r = n, e
                }, e.flush = function () {
                    return o.store = {}, e
                }, e.eof = function () {
                    return r >= n.length
                }, e
            }
        }).call(this, require("buffer").Buffer);
    }, {"./lib/vars.js": 67, "buffer": 78, "buffers": "OBo3aV", "chainsaw": 68, "events": "T9Wsc/", "stream": 102}],
    67: [function (require, module, exports) {
        module.exports = function (t) {
            function n(t, n) {
                var e = r.store, o = t.split(".");
                o.slice(0, -1).forEach(function (t) {
                    void 0 === e[t] && (e[t] = {}), e = e[t]
                });
                var u = o[o.length - 1];
                return 1 == arguments.length ? e[u] : e[u] = n
            }

            var r = {
                get: function (t) {
                    return n(t)
                }, set: function (t, r) {
                    return n(t, r)
                }, store: t || {}
            };
            return r
        };
    }, {}],
    68: [function (require, module, exports) {
        (function (n) {
            function t(n) {
                var e = t.saw(n, {}), r = n.call(e.handlers, e);
                return void 0 !== r && (e.handlers = r), e.record(), e.chain()
            }

            function e(n) {
                n.step = 0, n.pop = function () {
                    return n.actions[n.step++]
                }, n.trap = function (t, e) {
                    var r = Array.isArray(t) ? t : [t];
                    n.actions.push({path: r, step: n.step, cb: e, trap: !0})
                }, n.down = function (t) {
                    var e = (Array.isArray(t) ? t : [t]).join("/"), r = n.actions.slice(n.step).map(function (t) {
                        return t.trap && t.step <= n.step ? !1 : t.path.join("/") == e
                    }).indexOf(!0);
                    r >= 0 ? n.step += r : n.step = n.actions.length;
                    var a = n.actions[n.step - 1];
                    a && a.trap ? (n.step = a.step, a.cb()) : n.next()
                }, n.jump = function (t) {
                    n.step = t, n.next()
                }
            }

            var r = require("traverse"), a = require("events").EventEmitter;
            module.exports = t, t.light = function (n) {
                var e = t.saw(n, {}), r = n.call(e.handlers, e);
                return void 0 !== r && (e.handlers = r), e.chain()
            }, t.saw = function (s, o) {
                var i = new a;
                return i.handlers = o, i.actions = [], i.chain = function () {
                    var t = r(i.handlers).map(function (n) {
                        if (this.isRoot)return n;
                        var e = this.path;
                        "function" == typeof n && this.update(function () {
                            return i.actions.push({path: e, args: [].slice.call(arguments)}), t
                        })
                    });
                    return n.nextTick(function () {
                        i.emit("begin"), i.next()
                    }), t
                }, i.pop = function () {
                    return i.actions.shift()
                }, i.next = function () {
                    var n = i.pop();
                    if (n) {
                        if (!n.trap) {
                            var t = i.handlers;
                            n.path.forEach(function (n) {
                                t = t[n]
                            }), t.apply(i.handlers, n.args)
                        }
                    } else i.emit("end")
                }, i.nest = function (n) {
                    var e = [].slice.call(arguments, 1), r = !0;
                    if ("boolean" == typeof n) {
                        var r = n;
                        n = e.shift()
                    }
                    var a = t.saw(s, {}), o = s.call(a.handlers, a);
                    void 0 !== o && (a.handlers = o), "undefined" != typeof i.step && a.record(), n.apply(a.chain(), e), r !== !1 && a.on("end", i.next)
                }, i.record = function () {
                    e(i)
                }, ["trap", "down", "jump"].forEach(function (n) {
                    i[n] = function () {
                        throw new Error("To use the trap, down and jump features, please call record() first to start recording actions.")
                    }
                }), i
            }
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"));
    }, {
        "/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95,
        "events": "T9Wsc/",
        "traverse": 69
    }],
    69: [function (require, module, exports) {
        function Traverse(e) {
            return this instanceof Traverse ? void(this.value = e) : new Traverse(e)
        }

        function walk(e, t, r) {
            var n = [], o = [], a = !0;
            return function i(e) {
                var c = r ? copy(e) : e, s = {}, f = {
                    node: c,
                    node_: e,
                    path: [].concat(n),
                    parent: o.slice(-1)[0],
                    key: n.slice(-1)[0],
                    isRoot: 0 === n.length,
                    level: n.length,
                    circular: null,
                    update: function (e) {
                        f.isRoot || (f.parent.node[f.key] = e), f.node = e
                    },
                    "delete": function () {
                        delete f.parent.node[f.key]
                    },
                    remove: function () {
                        Array.isArray(f.parent.node) ? f.parent.node.splice(f.key, 1) : delete f.parent.node[f.key]
                    },
                    before: function (e) {
                        s.before = e
                    },
                    after: function (e) {
                        s.after = e
                    },
                    pre: function (e) {
                        s.pre = e
                    },
                    post: function (e) {
                        s.post = e
                    },
                    stop: function () {
                        a = !1
                    }
                };
                if (!a)return f;
                if ("object" == typeof c && null !== c) {
                    f.isLeaf = 0 == Object.keys(c).length;
                    for (var u = 0; u < o.length; u++)if (o[u].node_ === e) {
                        f.circular = o[u];
                        break
                    }
                } else f.isLeaf = !0;
                f.notLeaf = !f.isLeaf, f.notRoot = !f.isRoot;
                var l = t.call(f, f.node);
                if (void 0 !== l && f.update && f.update(l), s.before && s.before.call(f, f.node), "object" == typeof f.node && null !== f.node && !f.circular) {
                    o.push(f);
                    var p = Object.keys(f.node);
                    p.forEach(function (e, t) {
                        n.push(e), s.pre && s.pre.call(f, f.node[e], e);
                        var o = i(f.node[e]);
                        r && Object.hasOwnProperty.call(f.node, e) && (f.node[e] = o.node), o.isLast = t == p.length - 1, o.isFirst = 0 == t, s.post && s.post.call(f, o), n.pop()
                    }), o.pop()
                }
                return s.after && s.after.call(f, f.node), f
            }(e).node
        }

        function copy(e) {
            if ("object" == typeof e && null !== e) {
                var t;
                return t = Array.isArray(e) ? [] : e instanceof Date ? new Date(e) : e instanceof Boolean ? new Boolean(e) : e instanceof Number ? new Number(e) : e instanceof String ? new String(e) : Object.create(Object.getPrototypeOf(e)), Object.keys(e).forEach(function (r) {
                    t[r] = e[r]
                }), t
            }
            return e
        }

        module.exports = Traverse, Traverse.prototype.get = function (e) {
            for (var t = this.value, r = 0; r < e.length; r++) {
                var n = e[r];
                if (!Object.hasOwnProperty.call(t, n)) {
                    t = void 0;
                    break
                }
                t = t[n]
            }
            return t
        }, Traverse.prototype.set = function (e, t) {
            for (var r = this.value, n = 0; n < e.length - 1; n++) {
                var o = e[n];
                Object.hasOwnProperty.call(r, o) || (r[o] = {}), r = r[o]
            }
            return r[e[n]] = t, t
        }, Traverse.prototype.map = function (e) {
            return walk(this.value, e, !0)
        }, Traverse.prototype.forEach = function (e) {
            return this.value = walk(this.value, e, !1), this.value
        }, Traverse.prototype.reduce = function (e, t) {
            var r = 1 === arguments.length, n = r ? this.value : t;
            return this.forEach(function (t) {
                this.isRoot && r || (n = e.call(this, n, t))
            }), n
        }, Traverse.prototype.deepEqual = function (e) {
            if (1 !== arguments.length)throw new Error("deepEqual requires exactly one object to compare against");
            var t = !0, r = e;
            return this.forEach(function (n) {
                var o = function () {
                    return void(t = !1)
                }.bind(this);
                if (!this.isRoot) {
                    if ("object" != typeof r)return o();
                    r = r[this.key]
                }
                var a = r;
                this.post(function () {
                    r = a
                });
                var i = function (e) {
                    return Object.prototype.toString.call(e)
                };
                if (this.circular)Traverse(e).get(this.circular.path) !== a && o(); else if (typeof a != typeof n)o(); else if (null === a || null === n || void 0 === a || void 0 === n)a !== n && o(); else if (a.__proto__ !== n.__proto__)o(); else if (a === n); else if ("function" == typeof a)a instanceof RegExp ? a.toString() != n.toString() && o() : a !== n && o(); else if ("object" == typeof a)if ("[object Arguments]" === i(n) || "[object Arguments]" === i(a))i(a) !== i(n) && o(); else if (a instanceof Date || n instanceof Date)a instanceof Date && n instanceof Date && a.getTime() === n.getTime() || o(); else {
                    var c = Object.keys(a), s = Object.keys(n);
                    if (c.length !== s.length)return o();
                    for (var f = 0; f < c.length; f++) {
                        var u = c[f];
                        Object.hasOwnProperty.call(n, u) || o()
                    }
                }
            }), t
        }, Traverse.prototype.paths = function () {
            var e = [];
            return this.forEach(function () {
                e.push(this.path)
            }), e
        }, Traverse.prototype.nodes = function () {
            var e = [];
            return this.forEach(function () {
                e.push(this.node)
            }), e
        }, Traverse.prototype.clone = function () {
            var e = [], t = [];
            return function r(n) {
                for (var o = 0; o < e.length; o++)if (e[o] === n)return t[o];
                if ("object" == typeof n && null !== n) {
                    var a = copy(n);
                    return e.push(n), t.push(a), Object.keys(n).forEach(function (e) {
                        a[e] = r(n[e])
                    }), e.pop(), t.pop(), a
                }
                return n
            }(this.value)
        }, Object.keys(Traverse.prototype).forEach(function (e) {
            Traverse[e] = function (t) {
                var r = [].slice.call(arguments, 1), n = Traverse(t);
                return n[e].apply(n, r)
            }
        });
    }, {}],
    70: [function (require, module, exports) {
        (function (e, r) {
            function o(e) {
                "string" == typeof e ? e = {bindings: e} : e || (e = {}), e.__proto__ = d, e.module_root || (e.module_root = exports.getRoot(exports.getFileName())), ".node" != i.extname(e.bindings) && (e.bindings += ".node");
                for (var r, o, n, s = [], a = 0, l = e.try.length; l > a; a++) {
                    r = t.apply(null, e.try[a].map(function (r) {
                        return e[r] || r
                    })), s.push(r);
                    try {
                        return o = e.path ? require.resolve(r) : require(r), e.path || (o.path = r), o
                    } catch (u) {
                        if (!/not find/i.test(u.message))throw u
                    }
                }
                throw n = new Error("Could not locate the bindings file. Tried:\n" + s.map(function (r) {
                    return e.arrow + r
                }).join("\n")), n.tries = s, n
            }

            var n = require("fs"), i = require("path"), t = i.join, s = i.dirname, a = n.existsSync || i.existsSync, d = {
                arrow: e.env.NODE_BINDINGS_ARROW || " → ",
                compiled: e.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
                platform: e.platform,
                arch: e.arch,
                version: e.versions.node,
                bindings: "bindings.node",
                "try": [["module_root", "build", "bindings"], ["module_root", "build", "Debug", "bindings"], ["module_root", "build", "Release", "bindings"], ["module_root", "out", "Debug", "bindings"], ["module_root", "Debug", "bindings"], ["module_root", "out", "Release", "bindings"], ["module_root", "Release", "bindings"], ["module_root", "build", "default", "bindings"], ["module_root", "compiled", "version", "platform", "arch", "bindings"]]
            };
            module.exports = exports = o, exports.getFileName = function () {
                var e, o = Error.prepareStackTrace, n = Error.stackTraceLimit, i = {};
                return Error.stackTraceLimit = 10, Error.prepareStackTrace = function (o, n) {
                    for (var i = 0, t = n.length; t > i; i++)if (e = n[i].getFileName(), e !== r)return
                }, Error.captureStackTrace(i), i.stack, Error.prepareStackTrace = o, Error.stackTraceLimit = n, e
            }, exports.getRoot = function (r) {
                for (var o, n = s(r); ;) {
                    if ("." === n && (n = e.cwd()), a(t(n, "package.json")) || a(t(n, "node_modules")))return n;
                    if (o === n)throw new Error('Could not find module root given file: "' + r + '". Do you have a `package.json` file? ');
                    o = n, n = t(n, "..")
                }
            }
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), "/node_modules/bindings/bindings.js");
    }, {
        "/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95,
        "fs": 74,
        "path": 96
    }],
    71: [function (require, module, exports) {
        function assert(t, i) {
            if (!t)throw new Error(i || "Assertion failed")
        }

        function assertEqual(t, i, r) {
            if (t != i)throw new Error(r || "Assertion failed: " + t + " != " + i)
        }

        function inherits(t, i) {
            t.super_ = i;
            var r = function () {
            };
            r.prototype = i.prototype, t.prototype = new r, t.prototype.constructor = t
        }

        function BN(t, i) {
            return null !== t && "object" == typeof t && Array.isArray(t.words) ? t : (this.sign = !1, this.words = null, this.length = 0, this.red = null, void(null !== t && this._init(t || 0, i || 10)))
        }

        function zero6(t) {
            return 5 === t.length ? "0" + t : 4 === t.length ? "00" + t : 3 === t.length ? "000" + t : 2 === t.length ? "0000" + t : 1 === t.length ? "00000" + t : t
        }

        function zero14(t) {
            return 13 === t.length ? "0" + t : 12 === t.length ? "00" + t : 11 === t.length ? "000" + t : 10 === t.length ? "0000" + t : 9 === t.length ? "00000" + t : 8 === t.length ? "000000" + t : 7 === t.length ? "0000000" + t : 6 === t.length ? "00000000" + t : 5 === t.length ? "000000000" + t : 4 === t.length ? "0000000000" + t : 3 === t.length ? "00000000000" + t : 2 === t.length ? "000000000000" + t : 1 === t.length ? "0000000000000" + t : t
        }

        function MPrime(t, i) {
            this.name = t, this.p = new BN(i, 16), this.n = this.p.bitLength(), this.k = new BN(1).ishln(this.n).isub(this.p), this.tmp = this._tmp()
        }

        function K256() {
            MPrime.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
        }

        function P224() {
            MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
        }

        function P192() {
            MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
        }

        function P25519() {
            MPrime.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
        }

        function Red(t) {
            if ("string" == typeof t) {
                var i = BN._prime(t);
                this.m = i.p, this.prime = i
            } else this.m = t, this.prime = null
        }

        function Mont(t) {
            Red.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new BN(1).ishln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r.invm(this.m), this.minv = this.rinv.mul(this.r).sub(new BN(1)).div(this.m).neg().mod(this.r)
        }

        "object" == typeof module && (module.exports = BN), BN.BN = BN, BN.wordSize = 26, BN.prototype._init = function (t, i) {
            if ("number" == typeof t)return 0 > t && (this.sign = !0, t = -t), void(67108864 > t ? (this.words = [67108863 & t], this.length = 1) : (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2));
            if ("object" == typeof t) {
                assert("number" == typeof t.length), this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var r = 0; r < this.length; r++)this.words[r] = 0;
                for (var s = 0, r = t.length - 1, n = 0; r >= 0; r -= 3) {
                    var e = t[r] | t[r - 1] << 8 | t[r - 2] << 16;
                    this.words[n] |= e << s & 67108863, this.words[n + 1] = e >>> 26 - s & 67108863, s += 24, s >= 26 && (s -= 26, n++)
                }
                return this.strip()
            }
            "hex" === i && (i = 16), assert(16 >= i), t = t.toString().replace(/\s+/g, "");
            var o = 0;
            "-" === t[0] && o++, 16 === i ? this._parseHex(t, o) : this._parseBase(t, i, o), "-" === t[0] && (this.sign = !0), this.strip()
        }, BN.prototype._parseHex = function (t, i) {
            this.length = Math.ceil((t.length - i) / 6), this.words = new Array(this.length);
            for (var r = 0; r < this.length; r++)this.words[r] = 0;
            for (var s = 0, r = t.length - 6, n = 0; r >= i; r -= 6) {
                var e = parseInt(t.slice(r, r + 6), 16);
                this.words[n] |= e << s & 67108863, this.words[n + 1] |= e >>> 26 - s & 4194303, s += 24, s >= 26 && (s -= 26, n++)
            }
            if (r + 6 !== i) {
                var e = parseInt(t.slice(i, r + 6), 16);
                this.words[n] |= e << s & 67108863, this.words[n + 1] |= e >>> 26 - s & 4194303
            }
            this.strip()
        }, BN.prototype._parseBase = function (t, i, r) {
            this.words = [0], this.length = 1;
            for (var s = 0, n = 1, e = 0, o = null, h = r; h < t.length; h++) {
                var f, d = t[h];
                f = 10 === i || "9" >= d ? 0 | d : d >= "a" ? d.charCodeAt(0) - 97 + 10 : d.charCodeAt(0) - 65 + 10, s *= i, s += f, n *= i, e++, n > 1048575 && (assert(67108863 >= n), o || (o = new BN(n)), this.mul(o).copy(this), this.iadd(new BN(s)), s = 0, n = 1, e = 0)
            }
            0 !== e && (this.mul(new BN(n)).copy(this), this.iadd(new BN(s)))
        }, BN.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var i = 0; i < this.length; i++)t.words[i] = this.words[i];
            t.length = this.length, t.sign = this.sign, t.red = this.red
        }, BN.prototype.clone = function () {
            var t = new BN(null);
            return this.copy(t), t
        }, BN.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1];)this.length--;
            return this._normSign()
        }, BN.prototype._normSign = function () {
            return 1 === this.length && 0 === this.words[0] && (this.sign = !1), this
        }, BN.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
        };
        var div10 = new BN(null);
        div10.words = [8011776, 1490116], div10.length = 2, BN.prototype.toString = function (t) {
            if (t = t || 10, 16 === t || "hex" === t) {
                for (var i = "", r = 0, s = 0, n = 0; n < this.length; n++) {
                    var e = this.words[n], o = (16777215 & (e << r | s)).toString(16);
                    s = e >>> 24 - r & 16777215, i = 0 !== s || n !== this.length - 1 ? zero6(o) + i : o + i, r += 2, r >= 26 && (r -= 26, n--)
                }
                return 0 !== s && (i = s.toString(16) + i), this.sign && (i = "-" + i), i
            }
            if (10 === t) {
                var i = "", h = this.clone();
                for (h.sign = !1; 0 !== h.cmpn(0);) {
                    var f = h.modn(1e6);
                    h = h.idivn(1e6), i = 0 !== h.cmpn(0) ? zero6(f + "") + i : f + i
                }
                return 0 === this.cmpn(0) && (i = "0" + i), this.sign && (i = "-" + i), i
            }
            assert(!1, "Only 16 and 10 base are supported")
        }, BN.prototype.toJSON = function () {
            return this.toString(16)
        }, BN.prototype.toArray = function () {
            this.strip();
            var t = new Array(this.byteLength());
            t[0] = 0;
            for (var i = this.clone(), r = 0; 0 !== i.cmpn(0); r++) {
                var s = i.andln(255);
                i.ishrn(8), t[t.length - r - 1] = s
            }
            return t
        }, BN.prototype._countBits = function (t) {
            return t >= 33554432 ? 26 : t >= 16777216 ? 25 : t >= 8388608 ? 24 : t >= 4194304 ? 23 : t >= 2097152 ? 22 : t >= 1048576 ? 21 : t >= 524288 ? 20 : t >= 262144 ? 19 : t >= 131072 ? 18 : t >= 65536 ? 17 : t >= 32768 ? 16 : t >= 16384 ? 15 : t >= 8192 ? 14 : t >= 4096 ? 13 : t >= 2048 ? 12 : t >= 1024 ? 11 : t >= 512 ? 10 : t >= 256 ? 9 : t >= 128 ? 8 : t >= 64 ? 7 : t >= 32 ? 6 : t >= 16 ? 5 : t >= 8 ? 4 : t >= 4 ? 3 : t >= 2 ? 2 : t >= 1 ? 1 : 0
        }, BN.prototype.bitLength = function () {
            var t = 0, i = this.words[this.length - 1], t = this._countBits(i);
            return 26 * (this.length - 1) + t
        }, BN.prototype.byteLength = function () {
            this.words[this.length - 1];
            return Math.ceil(this.bitLength() / 8)
        }, BN.prototype.neg = function () {
            if (0 === this.cmpn(0))return this.clone();
            var t = this.clone();
            return t.sign = !this.sign, t
        }, BN.prototype.iadd = function (t) {
            if (this.sign && !t.sign) {
                this.sign = !1;
                var i = this.isub(t);
                return this.sign = !this.sign, this._normSign()
            }
            if (!this.sign && t.sign) {
                t.sign = !1;
                var i = this.isub(t);
                return t.sign = !0, i._normSign()
            }
            var r, s;
            this.length > t.length ? (r = this, s = t) : (r = t, s = this);
            for (var n = 0, e = 0; e < s.length; e++) {
                var i = r.words[e] + s.words[e] + n;
                this.words[e] = 67108863 & i, n = i >>> 26
            }
            for (; 0 !== n && e < r.length; e++) {
                var i = r.words[e] + n;
                this.words[e] = 67108863 & i, n = i >>> 26
            }
            if (this.length = r.length, 0 !== n)this.words[this.length] = n, this.length++; else if (r !== this)for (; e < r.length; e++)this.words[e] = r.words[e];
            return this
        }, BN.prototype.add = function (t) {
            if (t.sign && !this.sign) {
                t.sign = !1;
                var i = this.sub(t);
                return t.sign = !0, i
            }
            if (!t.sign && this.sign) {
                this.sign = !1;
                var i = t.sub(this);
                return this.sign = !0, i
            }
            return this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
        }, BN.prototype.isub = function (t) {
            if (t.sign) {
                t.sign = !1;
                var i = this.iadd(t);
                return t.sign = !0, i._normSign()
            }
            if (this.sign)return this.sign = !1, this.iadd(t), this.sign = !0, this._normSign();
            var r = this.cmp(t);
            if (0 === r)return this.sign = !1, this.length = 1, this.words[0] = 0, this;
            if (r > 0)var s = this, n = t; else var s = t, n = this;
            for (var e = 0, o = 0; o < n.length; o++) {
                var i = s.words[o] - n.words[o] - e;
                0 > i ? (i += 67108864, e = 1) : e = 0, this.words[o] = i
            }
            for (; 0 !== e && o < s.length; o++) {
                var i = s.words[o] - e;
                0 > i ? (i += 67108864, e = 1) : e = 0, this.words[o] = i
            }
            if (0 === e && o < s.length && s !== this)for (; o < s.length; o++)this.words[o] = s.words[o];
            return this.length = Math.max(this.length, o), s !== this && (this.sign = !0), this.strip()
        }, BN.prototype.sub = function (t) {
            return this.clone().isub(t)
        }, BN.prototype.mulTo = function (t, i) {
            i.sign = t.sign !== this.sign, i.length = this.length + t.length;
            for (var r = 0, s = 0; s < i.length - 1; s++) {
                for (var n = r >>> 26, e = 67108863 & r, o = Math.min(s, t.length - 1), h = Math.max(0, s - this.length + 1); o >= h; h++) {
                    var f = s - h, d = this.words[f], u = t.words[h], l = d * u, p = 67108863 & l;
                    n += l / 67108864 | 0, p += e, e = 67108863 & p, n += p >>> 26
                }
                i.words[s] = e, r = n
            }
            return 0 !== r ? i.words[s] = r : i.length--, i.strip()
        }, BN.prototype.mul = function (t) {
            var i = new BN(null);
            return i.words = new Array(this.length + t.length), this.mulTo(t, i)
        }, BN.prototype.imul = function (t) {
            if (0 === this.cmpn(0) || 0 === t.cmpn(0))return this.words[0] = 0, this.length = 1, this;
            var i = this.length, r = t.length;
            this.sign = t.sign !== this.sign, this.length = this.length + t.length, this.words[this.length - 1] = 0;
            for (var s = this.length - 2; s >= 0; s--) {
                for (var n = 0, e = 0, o = Math.min(s, r - 1), h = Math.max(0, s - i + 1); o >= h; h++) {
                    var f = s - h, d = this.words[f], u = t.words[h], l = d * u, p = 67108863 & l;
                    n += l / 67108864 | 0, p += e, e = 67108863 & p, n += p >>> 26
                }
                this.words[s] = e, this.words[s + 1] += n, n = 0
            }
            for (var n = 0, f = 1; f < this.length; f++) {
                var a = this.words[f] + n;
                this.words[f] = 67108863 & a, n = a >>> 26
            }
            return this.strip()
        }, BN.prototype.sqr = function () {
            return this.mul(this)
        }, BN.prototype.isqr = function () {
            return this.mul(this)
        }, BN.prototype.ishln = function (t) {
            assert("number" == typeof t && t >= 0);
            {
                var i = t % 26, r = (t - i) / 26, s = 67108863 >>> 26 - i << 26 - i;
                this.clone()
            }
            if (0 !== i) {
                for (var n = 0, e = 0; e < this.length; e++) {
                    var o = this.words[e] & s, h = this.words[e] - o << i;
                    this.words[e] = h | n, n = o >>> 26 - i
                }
                n && (this.words[e] = n, this.length++)
            }
            if (0 !== r) {
                for (var e = this.length - 1; e >= 0; e--)this.words[e + r] = this.words[e];
                for (var e = 0; r > e; e++)this.words[e] = 0;
                this.length += r
            }
            return this.strip()
        }, BN.prototype.ishrn = function (t, i, r) {
            assert("number" == typeof t && t >= 0), i = i ? (i - i % 26) / 26 : 0;
            var s = t % 26, n = Math.min((t - s) / 26, this.length), e = 67108863 ^ 67108863 >>> s << s, o = r;
            if (i -= n, i = Math.max(0, i), o) {
                for (var h = 0; n > h; h++)o.words[h] = this.words[h];
                o.length = n
            }
            if (0 === n); else if (this.length > n) {
                this.length -= n;
                for (var h = 0; h < this.length; h++)this.words[h] = this.words[h + n]
            } else this.words[0] = 0, this.length = 1;
            for (var f = 0, h = this.length - 1; h >= 0 && (0 !== f || h >= i); h--) {
                var d = this.words[h];
                this.words[h] = f << 26 - s | d >>> s, f = d & e
            }
            return o && 0 !== f && (o.words[o.length++] = f), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip(), r ? {
                hi: this,
                lo: o
            } : this
        }, BN.prototype.shln = function (t) {
            return this.clone().ishln(t)
        }, BN.prototype.shrn = function (t) {
            return this.clone().ishrn(t)
        }, BN.prototype.testn = function (t) {
            assert("number" == typeof t && t >= 0);
            var i = t % 26, r = (t - i) / 26, s = 1 << i;
            if (this.length <= r)return !1;
            var n = this.words[r];
            return !!(n & s)
        }, BN.prototype.imaskn = function (t) {
            assert("number" == typeof t && t >= 0);
            var i = t % 26, r = (t - i) / 26;
            if (assert(!this.sign, "imaskn works only with positive numbers"), 0 !== i && r++, this.length = Math.min(r, this.length), 0 !== i) {
                var s = 67108863 ^ 67108863 >>> i << i;
                this.words[this.length - 1] &= s
            }
            return this.strip()
        }, BN.prototype.maskn = function (t) {
            return this.clone().imaskn(t)
        }, BN.prototype.iaddn = function (t) {
            if (assert("number" == typeof t), 0 > t)return this.isubn(t);
            this.words[0] += t;
            for (var i = 0; i < this.length && this.words[i] >= 67108864; i++)this.words[i] -= 67108864, i === this.length - 1 ? this.words[i + 1] = 1 : this.words[i + 1]++;
            return this.length = Math.max(this.length, i + 1), this
        }, BN.prototype.isubn = function (t) {
            if (assert("number" == typeof t), assert(this.cmpn(t) >= 0, "Sign change is not supported in isubn"), 0 > t)return this.iaddn(-t);
            this.words[0] -= t;
            for (var i = 0; i < this.length && this.words[i] < 0; i++)this.words[i] += 67108864, this.words[i + 1] -= 1;
            return this.strip()
        }, BN.prototype.addn = function (t) {
            return this.clone().iaddn(t)
        }, BN.prototype.subn = function (t) {
            return this.clone().isubn(t)
        }, BN.prototype.iabs = function () {
            return this.sign = !1, this
        }, BN.prototype.abs = function () {
            return this.clone().iabs()
        }, BN.prototype._wordDiv = function (t, i) {
            for (var r = this.length - t.length, s = this.clone(), n = t, e = "mod" !== i && new BN(0); s.length > n.length;) {
                var o = 67108864 * s.words[s.length - 1] + s.words[s.length - 2], h = o / n.words[n.length - 1], f = h / 67108864 | 0, d = 67108863 & h;
                h = new BN(null), h.words = [d, f], h.length = 2;
                var r = 26 * (s.length - n.length - 1);
                if (e) {
                    var u = h.shln(r);
                    s.sign ? e.isub(u) : e.iadd(u)
                }
                h = h.mul(n).ishln(r), s.sign ? s.iadd(h) : s.isub(h)
            }
            for (; s.ucmp(n) >= 0;) {
                var o = s.words[s.length - 1], h = new BN(o / n.words[n.length - 1] | 0), r = 26 * (s.length - n.length);
                if (e) {
                    var u = h.shln(r);
                    s.sign ? e.isub(u) : e.iadd(u)
                }
                h = h.mul(n).ishln(r), s.sign ? s.iadd(h) : s.isub(h)
            }
            return s.sign && (e && e.isubn(1), s.iadd(n)), {div: e ? e : null, mod: s}
        }, BN.prototype.divmod = function (t, i) {
            if (assert(0 !== t.cmpn(0)), this.sign && !t.sign) {
                var r, s, n = this.neg().divmod(t, i);
                return "mod" !== i && (r = n.div.neg()), "div" !== i && (s = 0 === n.mod.cmpn(0) ? n.mod : t.sub(n.mod)), {
                    div: r,
                    mod: s
                }
            }
            if (!this.sign && t.sign) {
                var r, n = this.divmod(t.neg(), i);
                return "mod" !== i && (r = n.div.neg()), {div: r, mod: n.mod}
            }
            return this.sign && t.sign ? this.neg().divmod(t.neg(), i) : t.length > this.length || this.cmp(t) < 0 ? {
                div: new BN(0),
                mod: this
            } : 1 === t.length ? "div" === i ? {div: this.divn(t.words[0]), mod: null} : "mod" === i ? {
                div: null,
                mod: new BN(this.modn(t.words[0]))
            } : {div: this.divn(t.words[0]), mod: new BN(this.modn(t.words[0]))} : this._wordDiv(t, i)
        }, BN.prototype.div = function (t) {
            return this.divmod(t, "div").div
        }, BN.prototype.mod = function (t) {
            return this.divmod(t, "mod").mod
        }, BN.prototype.divRound = function (t) {
            var i = this.divmod(t);
            if (0 === i.mod.cmpn(0))return i.div;
            var r = i.div.sign ? i.mod.isub(t) : i.mod, s = t.shrn(1), n = t.andln(1), e = r.cmp(s);
            return 0 > e || 1 === n && 0 === e ? i.div : i.div.sign ? i.div.isubn(1) : i.div.iaddn(1)
        }, BN.prototype.modn = function (t) {
            assert(67108863 >= t);
            for (var i = (1 << 26) % t, r = 0, s = this.length - 1; s >= 0; s--)r = (i * r + this.words[s]) % t;
            return r
        }, BN.prototype.idivn = function (t) {
            assert(67108863 >= t);
            for (var i = 0, r = this.length - 1; r >= 0; r--) {
                var s = this.words[r] + 67108864 * i;
                this.words[r] = s / t | 0, i = s % t
            }
            return this.strip()
        }, BN.prototype.divn = function (t) {
            return this.clone().idivn(t)
        }, BN.prototype._egcd = function (t, i) {
            assert(!i.sign), assert(0 !== i.cmpn(0));
            var r = this, s = i.clone();
            r = r.sign ? r.mod(i) : r.clone();
            for (var n = new BN(0); r.cmpn(1) > 0 && s.cmpn(1) > 0;) {
                for (; r.isEven();)r.ishrn(1), t.isEven() ? t.ishrn(1) : t.iadd(i).ishrn(1);
                for (; s.isEven();)s.ishrn(1), n.isEven() ? n.ishrn(1) : n.iadd(i).ishrn(1);
                r.cmp(s) >= 0 ? (r.isub(s), t.isub(n)) : (s.isub(r), n.isub(t))
            }
            return 0 === r.cmpn(1) ? t : n
        }, BN.prototype.gcd = function (t) {
            if (0 === this.cmpn(0))return t.clone();
            if (0 === t.cmpn(0))return this.clone();
            var i = this.clone(), r = t.clone();
            i.sign = !1, r.sign = !1;
            for (var s = 0; i.isEven() && r.isEven(); s++)i.ishrn(1), r.ishrn(1);
            for (; i.isEven();)i.ishrn(1);
            do {
                for (; r.isEven();)r.ishrn(1);
                if (i.cmp(r) < 0) {
                    var n = i;
                    i = r, r = n
                }
                i.isub(i.div(r).mul(r))
            } while (0 !== i.cmpn(0) && 0 !== r.cmpn(0));
            return 0 === i.cmpn(0) ? r.ishln(s) : i.ishln(s)
        }, BN.prototype.invm = function (t) {
            return this._egcd(new BN(1), t).mod(t)
        }, BN.prototype.isEven = function () {
            return 0 === (1 & this.words[0])
        }, BN.prototype.isOdd = function () {
            return 1 === (1 & this.words[0])
        }, BN.prototype.andln = function (t) {
            return this.words[0] & t
        }, BN.prototype.bincn = function (t) {
            assert("number" == typeof t);
            var i = t % 26, r = (t - i) / 26, s = 1 << i;
            if (this.length <= r) {
                for (var n = this.length; r + 1 > n; n++)this.words[n] = 0;
                return this.words[r] |= s, this.length = r + 1, this
            }
            for (var e = s, n = r; 0 !== e && n < this.length; n++) {
                var o = this.words[n];
                o += e, e = o >>> 26, o &= 67108863, this.words[n] = o
            }
            return 0 !== e && (this.words[n] = e, this.length++), this
        }, BN.prototype.cmpn = function (t) {
            var i = 0 > t;
            if (i && (t = -t), this.sign && !i)return -1;
            if (!this.sign && i)return 1;
            t &= 67108863, this.strip();
            var r;
            if (this.length > 1)r = 1; else {
                var s = this.words[0];
                r = s === t ? 0 : t > s ? -1 : 1
            }
            return this.sign && (r = -r), r
        }, BN.prototype.cmp = function (t) {
            if (this.sign && !t.sign)return -1;
            if (!this.sign && t.sign)return 1;
            var i = this.ucmp(t);
            return this.sign ? -i : i
        }, BN.prototype.ucmp = function (t) {
            if (this.length > t.length)return 1;
            if (this.length < t.length)return -1;
            for (var i = 0, r = this.length - 1; r >= 0; r--) {
                var s = this.words[r], n = t.words[r];
                if (s !== n) {
                    n > s ? i = -1 : s > n && (i = 1);
                    break
                }
            }
            return i
        }, BN.red = function (t) {
            return new Red(t)
        }, BN.prototype.toRed = function (t) {
            return assert(!this.red, "Already a number in reduction context"), assert(!this.sign, "red works only with positives"), t.convertTo(this)._forceRed(t)
        }, BN.prototype.fromRed = function () {
            return assert(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
        }, BN.prototype._forceRed = function (t) {
            return this.red = t, this
        }, BN.prototype.forceRed = function (t) {
            return assert(!this.red, "Already a number in reduction context"), this._forceRed(t)
        }, BN.prototype.redAdd = function (t) {
            return assert(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
        }, BN.prototype.redIAdd = function (t) {
            return assert(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
        }, BN.prototype.redSub = function (t) {
            return assert(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
        }, BN.prototype.redISub = function (t) {
            return assert(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
        }, BN.prototype.redShl = function (t) {
            return assert(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
        }, BN.prototype.redMul = function (t) {
            return assert(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
        }, BN.prototype.redIMul = function (t) {
            return assert(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
        }, BN.prototype.redSqr = function () {
            return assert(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
        }, BN.prototype.redISqr = function () {
            return assert(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
        }, BN.prototype.redSqrt = function () {
            return assert(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
        }, BN.prototype.redInvm = function () {
            return assert(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
        }, BN.prototype.redNeg = function () {
            return assert(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
        }, BN.prototype.redPow = function (t) {
            return assert(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
        };
        var primes = {k256: null, p224: null, p192: null, p25519: null};
        MPrime.prototype._tmp = function () {
            var t = new BN(null);
            return t.words = new Array(Math.ceil(this.n / 13)), t
        }, MPrime.prototype.ireduce = function (t) {
            var i, r = t;
            do {
                var s = r.ishrn(this.n, 0, this.tmp);
                r = this.imulK(s.hi), r = r.iadd(s.lo), i = r.bitLength()
            } while (i > this.n);
            var n = i < this.n ? -1 : r.cmp(this.p);
            return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : r.strip(), r
        }, MPrime.prototype.imulK = function (t) {
            return t.imul(this.k)
        }, inherits(K256, MPrime), K256.prototype.imulK = function (t) {
            t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
            for (var i = t.length - 3; i >= 0; i--) {
                var r = t.words[i], s = 64 * r, n = 977 * r;
                s += n / 67108864 | 0;
                var e = s / 67108864 | 0;
                s &= 67108863, n &= 67108863, t.words[i + 2] += e, t.words[i + 1] += s, t.words[i] = n
            }
            var r = t.words[t.length - 2];
            return r >= 67108864 && (t.words[t.length - 1] += r >>> 26, t.words[t.length - 2] = 67108863 & r), 0 === t.words[t.length - 1] && t.length--, 0 === t.words[t.length - 1] && t.length--, t
        }, inherits(P224, MPrime), inherits(P192, MPrime), inherits(P25519, MPrime), P25519.prototype.imulK = function (t) {
            for (var i = 0, r = 0; r < t.length; r++) {
                var s = 19 * t.words[r] + i, n = 67108863 & s;
                s >>>= 26, t.words[r] = n, i = s
            }
            return 0 !== i && (t.words[t.length++] = i), t
        }, BN._prime = function t(i) {
            if (primes[i])return primes[i];
            var t;
            if ("k256" === i)t = new K256; else if ("p224" === i)t = new P224; else if ("p192" === i)t = new P192; else {
                if ("p25519" !== i)throw new Error("Unknown prime " + i);
                t = new P25519
            }
            return primes[i] = t, t
        }, Red.prototype._verify1 = function (t) {
            assert(!t.sign, "red works only with positives"), assert(t.red, "red works only with red numbers")
        }, Red.prototype._verify2 = function (t, i) {
            assert(!t.sign && !i.sign, "red works only with positives"), assert(t.red && t.red === i.red, "red works only with red numbers")
        }, Red.prototype.imod = function (t) {
            return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.mod(this.m)._forceRed(this)
        }, Red.prototype.neg = function (t) {
            var i = t.clone();
            return i.sign = !i.sign, i.iadd(this.m)._forceRed(this)
        }, Red.prototype.add = function (t, i) {
            this._verify2(t, i);
            var r = t.add(i);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
        }, Red.prototype.iadd = function (t, i) {
            this._verify2(t, i);
            var r = t.iadd(i);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r
        }, Red.prototype.sub = function (t, i) {
            this._verify2(t, i);
            var r = t.sub(i);
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
        }, Red.prototype.isub = function (t, i) {
            this._verify2(t, i);
            var r = t.isub(i);
            return r.cmpn(0) < 0 && r.iadd(this.m), r
        }, Red.prototype.shl = function (t, i) {
            return this._verify1(t), this.imod(t.shln(i))
        }, Red.prototype.imul = function (t, i) {
            return this._verify2(t, i), this.imod(t.imul(i))
        }, Red.prototype.mul = function (t, i) {
            return this._verify2(t, i), this.imod(t.mul(i))
        }, Red.prototype.isqr = function (t) {
            return this.imul(t, t)
        }, Red.prototype.sqr = function (t) {
            return this.mul(t, t)
        }, Red.prototype.sqrt = function (t) {
            if (0 === t.cmpn(0))return t.clone();
            var i = this.m.andln(3);
            if (assert(i % 2 === 1), 3 === i) {
                var r = this.m.add(new BN(1)).ishrn(2), s = this.pow(t, r);
                return s
            }
            for (var n = this.m.subn(1), e = 0; 0 !== n.cmpn(0) && 0 === n.andln(1);)e++, n.ishrn(1);
            assert(0 !== n.cmpn(0));
            var o = new BN(1).toRed(this), h = o.redNeg(), f = this.m.subn(1).ishrn(1), d = this.m.bitLength();
            for (d = new BN(2 * d * d).toRed(this); 0 !== this.pow(d, f).cmp(h);)d.redIAdd(h);
            for (var u = this.pow(d, n), s = this.pow(t, n.addn(1).ishrn(1)), l = this.pow(t, n), p = e; 0 !== l.cmp(o);) {
                for (var a = l, g = 0; 0 !== a.cmp(o); g++)a = a.redSqr();
                assert(p > g);
                var m = this.pow(u, new BN(1).ishln(p - g - 1));
                s = s.redMul(m), u = m.redSqr(), l = l.redMul(u), p = g
            }
            return s
        }, Red.prototype.invm = function (t) {
            var i = t._egcd(new BN(1), this.m);
            return i.sign ? (i.sign = !1, this.imod(i).redNeg()) : this.imod(i)
        }, Red.prototype.pow = function (t, i) {
            for (var r = [], s = i.clone(); 0 !== s.cmpn(0);)r.push(s.andln(1)), s.ishrn(1);
            for (var n = t, e = 0; e < r.length && 0 === r[e]; e++, n = this.sqr(n));
            if (++e < r.length)for (var s = this.sqr(n); e < r.length; e++, s = this.sqr(s))0 !== r[e] && (n = this.mul(n, s));
            return n
        }, Red.prototype.convertTo = function (t) {
            return t.clone()
        }, Red.prototype.convertFrom = function (t) {
            var i = t.clone();
            return i.red = null, i
        }, BN.mont = function (t) {
            return new Mont(t)
        }, inherits(Mont, Red), Mont.prototype.convertTo = function (t) {
            return this.imod(t.shln(this.shift))
        }, Mont.prototype.convertFrom = function (t) {
            var i = this.imod(t.mul(this.rinv));
            return i.red = null, i
        }, Mont.prototype.imul = function (t, i) {
            if (0 === t.cmpn(0) || 0 === i.cmpn(0))return t.words[0] = 0, t.length = 1, t;
            var r = t.imul(i), s = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(s).ishrn(this.shift), e = n;
            return n.cmp(this.m) >= 0 ? e = n.isub(this.m) : n.cmpn(0) < 0 && (e = n.iadd(this.m)), e._forceRed(this)
        }, Mont.prototype.mul = function (t, i) {
            if (0 === t.cmpn(0) || 0 === i.cmpn(0))return new BN(0)._forceRed(this);
            var r = t.mul(i), s = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(s).ishrn(this.shift), e = n;
            return n.cmp(this.m) >= 0 ? e = n.isub(this.m) : n.cmpn(0) < 0 && (e = n.iadd(this.m)), e._forceRed(this)
        }, Mont.prototype.invm = function (t) {
            var i = this.imod(t.invm(this.m).mul(this.r2));
            return i._forceRed(this)
        };
    }, {}],
    "buffertools": [function (require, module, exports) {
        module.exports = require('fugeBw');
    }, {}],
    "fugeBw": [function (require, module, exports) {
        (function (t) {
            "use strict";
            function r() {
                this.writable = !0, this.buffer = null
            }

            var e = require("events"), n = require("util"), i = {};
            module.exports.Buffer = t;
            var o = function (r) {
                return r instanceof t || r instanceof Uint8Array
            }, f = function (t) {
                return function () {
                    var r = this;
                    if (o(r)); else {
                        if (!o(arguments[0]))throw new Error("Argument should be a buffer object.");
                        r = arguments[0], Array.prototype.shift.apply(arguments)
                    }
                    return t.apply(r, arguments)
                }
            }, u = function (t) {
                return function () {
                    var r = this;
                    if (o(r)); else {
                        if (!o(arguments[0]))throw Error("Argument should be a buffer object.");
                        r = arguments[0], Array.prototype.shift.apply(arguments)
                    }
                    var e = arguments[0];
                    if ("string" == typeof e || e instanceof String || o(e))return t.apply(r, arguments);
                    throw new Error("Second argument must be a string or a buffer.")
                }
            };
            i.clear = f(function () {
                for (var t = 0; t < this.length; t++)this[t] = 0;
                return this
            }), i.fill = f(function (t) {
                for (var r = "undefined" == typeof t.length ? 1 : t.length, e = 0; e < this.length; e += r)for (var n = 0; r > n; n++)this[e + n] = "undefined" == typeof t.length ? t : "string" == typeof t[n] ? t[n].charCodeAt(0) : t[n];
                return this
            }), i.indexOf = f(function (t, r) {
                if (r = r || 0, 0 === t.length)return -1;
                for (var e = r; e < this.length - t.length + 1; e += 1) {
                    for (var n = !0, i = 0; i < t.length; i++) {
                        var o = this[e + i], f = t[i];
                        if ("string" == typeof f && (f = f.charCodeAt(0)), o !== f) {
                            n = !1;
                            break
                        }
                    }
                    if (n)return e
                }
                return -1
            }), i.equals = u(function (t) {
                return 0 === i.compare(this, t)
            }), i.compare = u(function (t) {
                var r = this, e = r.length, n = t.length;
                if (e !== n)return e > n ? 1 : -1;
                for (var i = 0; e > i; i++) {
                    var o = r[i], f = t[i];
                    if ("string" == typeof f && (f = f.charCodeAt(0)), o !== f)return o > f ? 1 : -1
                }
                return 0
            }), i.concat = function () {
                for (var r = 0, e = 0; e < arguments.length; e++) {
                    if (void 0 === arguments[e].length)throw Error("all arguments must be strings or Buffers");
                    r += arguments[e].length
                }
                for (var n = new t(r), i = 0, e = 0; e < arguments.length; e++)for (var o = 0; o < arguments[e].length; o++)n[i++] = "string" == typeof arguments[e][o] ? arguments[e][o].charCodeAt(0) : arguments[e][o];
                return n
            }, i.reverse = f(function () {
                for (var r = new t(this.length), e = 0; e < this.length; e++)r[e] = this[this.length - e - 1];
                return r
            }), i.toHex = f(function () {
                for (var t = "", r = 0; r < this.length; r++) {
                    var e = this[r].toString(16);
                    1 == e.length && (e = "0" + e), e.length > 2 && (e = e.substring(1, 3)), t += e
                }
                return t
            }), i.fromHex = f(function () {
                var r = this.length;
                if (r % 2 !== 0)throw new Error("Invalid hex string length");
                for (var e = new t(r / 2), n = 0; n < e.length; n++) {
                    var i = String.fromCharCode(this[2 * n]), o = String.fromCharCode(this[2 * n + 1]);
                    e[n] = parseInt(i + o, 16)
                }
                return e
            }), exports.extend = function () {
                var r;
                r = arguments.length > 0 ? Array.prototype.slice.call(arguments) : "function" == typeof Uint8Array ? [t.prototype, Uint8Array.prototype] : [t.prototype];
                for (var e = 0, n = r.length; n > e; e += 1) {
                    var o = r[e];
                    for (var f in i)o[f] = i[f];
                    o !== exports && (o.concat = function () {
                        var t = [this].concat(Array.prototype.slice.call(arguments));
                        return i.concat.apply(i, t)
                    })
                }
            }, exports.extend(exports), n.inherits(r, e.EventEmitter), r.prototype._append = function (r, e) {
                if (!this.writable)throw new Error("Stream is not writable.");
                if (t.isBuffer(r)); else {
                    if ("string" != typeof r)throw new Error("Argument should be either a buffer or a string.");
                    r = new t(r, e || "utf8")
                }
                this.buffer ? this.buffer = i.concat(this.buffer, r) : (this.buffer = new t(r.length), r.copy(this.buffer))
            }, r.prototype.write = function (t, r) {
                return this._append(t, r), !0
            }, r.prototype.end = function (t, r) {
                t && this._append(t, r), this.emit("close"), this.writable = !1
            }, r.prototype.getBuffer = function () {
                return this.buffer ? this.buffer : new t(0)
            }, r.prototype.toString = function () {
                return this.getBuffer().toString()
            }, exports.WritableBufferStream = r
        }).call(this, require("buffer").Buffer);
    }, {"buffer": 78, "events": "T9Wsc/", "util": 111}],
    74: [function (require, module, exports) {

    }, {}],
    75: [function (require, module, exports) {
        function replacer(t, e) {
            return util.isUndefined(e) ? "" + e : !util.isNumber(e) || !isNaN(e) && isFinite(e) ? util.isFunction(e) || util.isRegExp(e) ? e.toString() : e : e.toString()
        }

        function truncate(t, e) {
            return util.isString(t) ? t.length < e ? t : t.slice(0, e) : t
        }

        function getMessage(t) {
            return truncate(JSON.stringify(t.actual, replacer), 128) + " " + t.operator + " " + truncate(JSON.stringify(t.expected, replacer), 128)
        }

        function fail(t, e, r, i, s) {
            throw new assert.AssertionError({message: r, actual: t, expected: e, operator: i, stackStartFunction: s})
        }

        function ok(t, e) {
            t || fail(t, !0, e, "==", assert.ok)
        }

        function _deepEqual(t, e) {
            if (t === e)return !0;
            if (util.isBuffer(t) && util.isBuffer(e)) {
                if (t.length != e.length)return !1;
                for (var r = 0; r < t.length; r++)if (t[r] !== e[r])return !1;
                return !0
            }
            return util.isDate(t) && util.isDate(e) ? t.getTime() === e.getTime() : util.isRegExp(t) && util.isRegExp(e) ? t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase : util.isObject(t) || util.isObject(e) ? objEquiv(t, e) : t == e
        }

        function isArguments(t) {
            return "[object Arguments]" == Object.prototype.toString.call(t)
        }

        function objEquiv(t, e) {
            if (util.isNullOrUndefined(t) || util.isNullOrUndefined(e))return !1;
            if (t.prototype !== e.prototype)return !1;
            if (isArguments(t))return isArguments(e) ? (t = pSlice.call(t), e = pSlice.call(e), _deepEqual(t, e)) : !1;
            try {
                var r, i, s = objectKeys(t), n = objectKeys(e)
            } catch (a) {
                return !1
            }
            if (s.length != n.length)return !1;
            for (s.sort(), n.sort(), i = s.length - 1; i >= 0; i--)if (s[i] != n[i])return !1;
            for (i = s.length - 1; i >= 0; i--)if (r = s[i], !_deepEqual(t[r], e[r]))return !1;
            return !0
        }

        function expectedException(t, e) {
            return t && e ? "[object RegExp]" == Object.prototype.toString.call(e) ? e.test(t) : t instanceof e ? !0 : e.call({}, t) === !0 ? !0 : !1 : !1
        }

        function _throws(t, e, r, i) {
            var s;
            util.isString(r) && (i = r, r = null);
            try {
                e()
            } catch (n) {
                s = n
            }
            if (i = (r && r.name ? " (" + r.name + ")." : ".") + (i ? " " + i : "."), t && !s && fail(s, r, "Missing expected exception" + i), !t && expectedException(s, r) && fail(s, r, "Got unwanted exception" + i), t && s && r && !expectedException(s, r) || !t && s)throw s
        }

        var util = require("util/"), pSlice = Array.prototype.slice, hasOwn = Object.prototype.hasOwnProperty, assert = module.exports = ok;
        assert.AssertionError = function (t) {
            this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = getMessage(this), this.generatedMessage = !0);
            var e = t.stackStartFunction || fail;
            if (Error.captureStackTrace)Error.captureStackTrace(this, e); else {
                var r = new Error;
                if (r.stack) {
                    var i = r.stack, s = e.name, n = i.indexOf("\n" + s);
                    if (n >= 0) {
                        var a = i.indexOf("\n", n + 1);
                        i = i.substring(a + 1)
                    }
                    this.stack = i
                }
            }
        }, util.inherits(assert.AssertionError, Error), assert.fail = fail, assert.ok = ok, assert.equal = function (t, e, r) {
            t != e && fail(t, e, r, "==", assert.equal)
        }, assert.notEqual = function (t, e, r) {
            t == e && fail(t, e, r, "!=", assert.notEqual)
        }, assert.deepEqual = function (t, e, r) {
            _deepEqual(t, e) || fail(t, e, r, "deepEqual", assert.deepEqual)
        }, assert.notDeepEqual = function (t, e, r) {
            _deepEqual(t, e) && fail(t, e, r, "notDeepEqual", assert.notDeepEqual)
        }, assert.strictEqual = function (t, e, r) {
            t !== e && fail(t, e, r, "===", assert.strictEqual)
        }, assert.notStrictEqual = function (t, e, r) {
            t === e && fail(t, e, r, "!==", assert.notStrictEqual)
        }, assert.throws = function () {
            _throws.apply(this, [!0].concat(pSlice.call(arguments)))
        }, assert.doesNotThrow = function () {
            _throws.apply(this, [!1].concat(pSlice.call(arguments)))
        }, assert.ifError = function (t) {
            if (t)throw t
        };
        var objectKeys = Object.keys || function (t) {
                var e = [];
                for (var r in t)hasOwn.call(t, r) && e.push(r);
                return e
            };
    }, {"util/": 77}],
    76: [function (require, module, exports) {
        module.exports = function (o) {
            return o && "object" == typeof o && "function" == typeof o.copy && "function" == typeof o.fill && "function" == typeof o.readUInt8
        };
    }, {}],
    77: [function (require, module, exports) {
        (function (e, t) {
            function r(e, t) {
                var r = {seen: [], stylize: o};
                return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), g(t) ? r.showHidden = t : t && exports._extend(r, t), b(r.showHidden) && (r.showHidden = !1), b(r.depth) && (r.depth = 2), b(r.colors) && (r.colors = !1), b(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = n), s(r, e, r.depth)
            }

            function n(e, t) {
                var n = r.styles[t];
                return n ? "[" + r.colors[n][0] + "m" + e + "[" + r.colors[n][1] + "m" : e
            }

            function o(e) {
                return e
            }

            function i(e) {
                var t = {};
                return e.forEach(function (e) {
                    t[e] = !0
                }), t
            }

            function s(e, t, r) {
                if (e.customInspect && t && S(t.inspect) && t.inspect !== exports.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                    var n = t.inspect(r, e);
                    return x(n) || (n = s(e, n, r)), n
                }
                var o = u(e, t);
                if (o)return o;
                var g = Object.keys(t), y = i(g);
                if (e.showHidden && (g = Object.getOwnPropertyNames(t)), O(t) && (g.indexOf("message") >= 0 || g.indexOf("description") >= 0))return c(t);
                if (0 === g.length) {
                    if (S(t)) {
                        var d = t.name ? ": " + t.name : "";
                        return e.stylize("[Function" + d + "]", "special")
                    }
                    if (v(t))return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                    if (j(t))return e.stylize(Date.prototype.toString.call(t), "date");
                    if (O(t))return c(t)
                }
                var m = "", h = !1, b = ["{", "}"];
                if (f(t) && (h = !0, b = ["[", "]"]), S(t)) {
                    var w = t.name ? ": " + t.name : "";
                    m = " [Function" + w + "]"
                }
                if (v(t) && (m = " " + RegExp.prototype.toString.call(t)), j(t) && (m = " " + Date.prototype.toUTCString.call(t)), O(t) && (m = " " + c(t)), 0 === g.length && (!h || 0 == t.length))return b[0] + m + b[1];
                if (0 > r)return v(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
                e.seen.push(t);
                var z;
                return z = h ? l(e, t, r, y, g) : g.map(function (n) {
                    return a(e, t, r, y, n, h)
                }), e.seen.pop(), p(z, m, b)
            }

            function u(e, t) {
                if (b(t))return e.stylize("undefined", "undefined");
                if (x(t)) {
                    var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(r, "string")
                }
                return m(t) ? e.stylize("" + t, "number") : g(t) ? e.stylize("" + t, "boolean") : y(t) ? e.stylize("null", "null") : void 0
            }

            function c(e) {
                return "[" + Error.prototype.toString.call(e) + "]"
            }

            function l(e, t, r, n, o) {
                for (var i = [], s = 0, u = t.length; u > s; ++s)i.push(_(t, String(s)) ? a(e, t, r, n, String(s), !0) : "");
                return o.forEach(function (o) {
                    o.match(/^\d+$/) || i.push(a(e, t, r, n, o, !0))
                }), i
            }

            function a(e, t, r, n, o, i) {
                var u, c, l;
                if (l = Object.getOwnPropertyDescriptor(t, o) || {value: t[o]}, l.get ? c = l.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : l.set && (c = e.stylize("[Setter]", "special")), _(n, o) || (u = "[" + o + "]"), c || (e.seen.indexOf(l.value) < 0 ? (c = y(r) ? s(e, l.value, null) : s(e, l.value, r - 1), c.indexOf("\n") > -1 && (c = i ? c.split("\n").map(function (e) {
                        return "  " + e
                    }).join("\n").substr(2) : "\n" + c.split("\n").map(function (e) {
                        return "   " + e
                    }).join("\n"))) : c = e.stylize("[Circular]", "special")), b(u)) {
                    if (i && o.match(/^\d+$/))return c;
                    u = JSON.stringify("" + o), u.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (u = u.substr(1, u.length - 2), u = e.stylize(u, "name")) : (u = u.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), u = e.stylize(u, "string"))
                }
                return u + ": " + c
            }

            function p(e, t, r) {
                var n = 0, o = e.reduce(function (e, t) {
                    return n++, t.indexOf("\n") >= 0 && n++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0);
                return o > 60 ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1]
            }

            function f(e) {
                return Array.isArray(e)
            }

            function g(e) {
                return "boolean" == typeof e
            }

            function y(e) {
                return null === e
            }

            function d(e) {
                return null == e
            }

            function m(e) {
                return "number" == typeof e
            }

            function x(e) {
                return "string" == typeof e
            }

            function h(e) {
                return "symbol" == typeof e
            }

            function b(e) {
                return void 0 === e
            }

            function v(e) {
                return w(e) && "[object RegExp]" === E(e)
            }

            function w(e) {
                return "object" == typeof e && null !== e
            }

            function j(e) {
                return w(e) && "[object Date]" === E(e)
            }

            function O(e) {
                return w(e) && ("[object Error]" === E(e) || e instanceof Error)
            }

            function S(e) {
                return "function" == typeof e
            }

            function z(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
            }

            function E(e) {
                return Object.prototype.toString.call(e)
            }

            function D(e) {
                return 10 > e ? "0" + e.toString(10) : e.toString(10)
            }

            function N() {
                var e = new Date, t = [D(e.getHours()), D(e.getMinutes()), D(e.getSeconds())].join(":");
                return [e.getDate(), U[e.getMonth()], t].join(" ")
            }

            function _(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }

            var A = /%[sdj%]/g;
            exports.format = function (e) {
                if (!x(e)) {
                    for (var t = [], n = 0; n < arguments.length; n++)t.push(r(arguments[n]));
                    return t.join(" ")
                }
                for (var n = 1, o = arguments, i = o.length, s = String(e).replace(A, function (e) {
                    if ("%%" === e)return "%";
                    if (n >= i)return e;
                    switch (e) {
                        case"%s":
                            return String(o[n++]);
                        case"%d":
                            return Number(o[n++]);
                        case"%j":
                            try {
                                return JSON.stringify(o[n++])
                            } catch (t) {
                                return "[Circular]"
                            }
                        default:
                            return e
                    }
                }), u = o[n]; i > n; u = o[++n])s += y(u) || !w(u) ? " " + u : " " + r(u);
                return s
            }, exports.deprecate = function (r, n) {
                function o() {
                    if (!i) {
                        if (e.throwDeprecation)throw new Error(n);
                        e.traceDeprecation ? console.trace(n) : console.error(n), i = !0
                    }
                    return r.apply(this, arguments)
                }

                if (b(t.process))return function () {
                    return exports.deprecate(r, n).apply(this, arguments)
                };
                if (e.noDeprecation === !0)return r;
                var i = !1;
                return o
            };
            var J, R = {};
            exports.debuglog = function (t) {
                if (b(J) && (J = e.env.NODE_DEBUG || ""), t = t.toUpperCase(), !R[t])if (new RegExp("\\b" + t + "\\b", "i").test(J)) {
                    var r = e.pid;
                    R[t] = function () {
                        var e = exports.format.apply(exports, arguments);
                        console.error("%s %d: %s", t, r, e)
                    }
                } else R[t] = function () {
                };
                return R[t]
            }, exports.inspect = r, r.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, r.styles = {
                special: "cyan",
                number: "yellow",
                "boolean": "yellow",
                undefined: "grey",
                "null": "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, exports.isArray = f, exports.isBoolean = g, exports.isNull = y, exports.isNullOrUndefined = d, exports.isNumber = m, exports.isString = x, exports.isSymbol = h, exports.isUndefined = b, exports.isRegExp = v, exports.isObject = w, exports.isDate = j, exports.isError = O, exports.isFunction = S, exports.isPrimitive = z, exports.isBuffer = require("./support/isBuffer");
            var U = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            exports.log = function () {
                console.log("%s - %s", N(), exports.format.apply(exports, arguments))
            }, exports.inherits = require("inherits"), exports._extend = function (e, t) {
                if (!t || !w(t))return e;
                for (var r = Object.keys(t), n = r.length; n--;)e[r[n]] = t[r[n]];
                return e
            }
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./support/isBuffer": 76,
        "/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95,
        "inherits": 94
    }],
    78: [function (require, module, exports) {
        function Buffer(e, t, r) {
            if (!(this instanceof Buffer))return new Buffer(e, t, r);
            var n = typeof e;
            if ("base64" === t && "string" === n)for (e = stringtrim(e); e.length % 4 !== 0;)e += "=";
            var i;
            if ("number" === n)i = coerce(e); else if ("string" === n)i = Buffer.byteLength(e, t); else {
                if ("object" !== n)throw new Error("First argument needs to be a number, array or string.");
                i = coerce(e.length)
            }
            var s;
            Buffer._useTypedArrays ? s = Buffer._augment(new Uint8Array(i)) : (s = this, s.length = i, s._isBuffer = !0);
            var a;
            if (Buffer._useTypedArrays && "number" == typeof e.byteLength)s._set(e); else if (isArrayish(e))for (a = 0; i > a; a++)s[a] = Buffer.isBuffer(e) ? e.readUInt8(a) : e[a]; else if ("string" === n)s.write(e, 0, t); else if ("number" === n && !Buffer._useTypedArrays && !r)for (a = 0; i > a; a++)s[a] = 0;
            return s
        }

        function _hexWrite(e, t, r, n) {
            r = Number(r) || 0;
            var i = e.length - r;
            n ? (n = Number(n), n > i && (n = i)) : n = i;
            var s = t.length;
            assert(s % 2 === 0, "Invalid hex string"), n > s / 2 && (n = s / 2);
            for (var a = 0; n > a; a++) {
                var o = parseInt(t.substr(2 * a, 2), 16);
                assert(!isNaN(o), "Invalid hex string"), e[r + a] = o
            }
            return Buffer._charsWritten = 2 * a, a
        }

        function _utf8Write(e, t, r, n) {
            var i = Buffer._charsWritten = blitBuffer(utf8ToBytes(t), e, r, n);
            return i
        }

        function _asciiWrite(e, t, r, n) {
            var i = Buffer._charsWritten = blitBuffer(asciiToBytes(t), e, r, n);
            return i
        }

        function _binaryWrite(e, t, r, n) {
            return _asciiWrite(e, t, r, n)
        }

        function _base64Write(e, t, r, n) {
            var i = Buffer._charsWritten = blitBuffer(base64ToBytes(t), e, r, n);
            return i
        }

        function _utf16leWrite(e, t, r, n) {
            var i = Buffer._charsWritten = blitBuffer(utf16leToBytes(t), e, r, n);
            return i
        }

        function _base64Slice(e, t, r) {
            return base64.fromByteArray(0 === t && r === e.length ? e : e.slice(t, r))
        }

        function _utf8Slice(e, t, r) {
            var n = "", i = "";
            r = Math.min(e.length, r);
            for (var s = t; r > s; s++)e[s] <= 127 ? (n += decodeUtf8Char(i) + String.fromCharCode(e[s]), i = "") : i += "%" + e[s].toString(16);
            return n + decodeUtf8Char(i)
        }

        function _asciiSlice(e, t, r) {
            var n = "";
            r = Math.min(e.length, r);
            for (var i = t; r > i; i++)n += String.fromCharCode(e[i]);
            return n
        }

        function _binarySlice(e, t, r) {
            return _asciiSlice(e, t, r)
        }

        function _hexSlice(e, t, r) {
            var n = e.length;
            (!t || 0 > t) && (t = 0), (!r || 0 > r || r > n) && (r = n);
            for (var i = "", s = t; r > s; s++)i += toHex(e[s]);
            return i
        }

        function _utf16leSlice(e, t, r) {
            for (var n = e.slice(t, r), i = "", s = 0; s < n.length; s += 2)i += String.fromCharCode(n[s] + 256 * n[s + 1]);
            return i
        }

        function _readUInt16(e, t, r, n) {
            n || (assert("boolean" == typeof r, "missing or invalid endian"), assert(void 0 !== t && null !== t, "missing offset"), assert(t + 1 < e.length, "Trying to read beyond buffer length"));
            var i = e.length;
            if (!(t >= i)) {
                var s;
                return r ? (s = e[t], i > t + 1 && (s |= e[t + 1] << 8)) : (s = e[t] << 8, i > t + 1 && (s |= e[t + 1])), s
            }
        }

        function _readUInt32(e, t, r, n) {
            n || (assert("boolean" == typeof r, "missing or invalid endian"), assert(void 0 !== t && null !== t, "missing offset"), assert(t + 3 < e.length, "Trying to read beyond buffer length"));
            var i = e.length;
            if (!(t >= i)) {
                var s;
                return r ? (i > t + 2 && (s = e[t + 2] << 16), i > t + 1 && (s |= e[t + 1] << 8), s |= e[t], i > t + 3 && (s += e[t + 3] << 24 >>> 0)) : (i > t + 1 && (s = e[t + 1] << 16), i > t + 2 && (s |= e[t + 2] << 8), i > t + 3 && (s |= e[t + 3]), s += e[t] << 24 >>> 0), s
            }
        }

        function _readInt16(e, t, r, n) {
            n || (assert("boolean" == typeof r, "missing or invalid endian"), assert(void 0 !== t && null !== t, "missing offset"), assert(t + 1 < e.length, "Trying to read beyond buffer length"));
            var i = e.length;
            if (!(t >= i)) {
                var s = _readUInt16(e, t, r, !0), a = 32768 & s;
                return a ? -1 * (65535 - s + 1) : s
            }
        }

        function _readInt32(e, t, r, n) {
            n || (assert("boolean" == typeof r, "missing or invalid endian"), assert(void 0 !== t && null !== t, "missing offset"), assert(t + 3 < e.length, "Trying to read beyond buffer length"));
            var i = e.length;
            if (!(t >= i)) {
                var s = _readUInt32(e, t, r, !0), a = 2147483648 & s;
                return a ? -1 * (4294967295 - s + 1) : s
            }
        }

        function _readFloat(e, t, r, n) {
            return n || (assert("boolean" == typeof r, "missing or invalid endian"), assert(t + 3 < e.length, "Trying to read beyond buffer length")), ieee754.read(e, t, r, 23, 4)
        }

        function _readDouble(e, t, r, n) {
            return n || (assert("boolean" == typeof r, "missing or invalid endian"), assert(t + 7 < e.length, "Trying to read beyond buffer length")), ieee754.read(e, t, r, 52, 8)
        }

        function _writeUInt16(e, t, r, n, i) {
            i || (assert(void 0 !== t && null !== t, "missing value"), assert("boolean" == typeof n, "missing or invalid endian"), assert(void 0 !== r && null !== r, "missing offset"), assert(r + 1 < e.length, "trying to write beyond buffer length"), verifuint(t, 65535));
            var s = e.length;
            if (!(r >= s))for (var a = 0, o = Math.min(s - r, 2); o > a; a++)e[r + a] = (t & 255 << 8 * (n ? a : 1 - a)) >>> 8 * (n ? a : 1 - a)
        }

        function _writeUInt32(e, t, r, n, i) {
            i || (assert(void 0 !== t && null !== t, "missing value"), assert("boolean" == typeof n, "missing or invalid endian"), assert(void 0 !== r && null !== r, "missing offset"), assert(r + 3 < e.length, "trying to write beyond buffer length"), verifuint(t, 4294967295));
            var s = e.length;
            if (!(r >= s))for (var a = 0, o = Math.min(s - r, 4); o > a; a++)e[r + a] = t >>> 8 * (n ? a : 3 - a) & 255
        }

        function _writeInt16(e, t, r, n, i) {
            i || (assert(void 0 !== t && null !== t, "missing value"), assert("boolean" == typeof n, "missing or invalid endian"), assert(void 0 !== r && null !== r, "missing offset"), assert(r + 1 < e.length, "Trying to write beyond buffer length"), verifsint(t, 32767, -32768));
            var s = e.length;
            r >= s || (t >= 0 ? _writeUInt16(e, t, r, n, i) : _writeUInt16(e, 65535 + t + 1, r, n, i))
        }

        function _writeInt32(e, t, r, n, i) {
            i || (assert(void 0 !== t && null !== t, "missing value"), assert("boolean" == typeof n, "missing or invalid endian"), assert(void 0 !== r && null !== r, "missing offset"), assert(r + 3 < e.length, "Trying to write beyond buffer length"), verifsint(t, 2147483647, -2147483648));
            var s = e.length;
            r >= s || (t >= 0 ? _writeUInt32(e, t, r, n, i) : _writeUInt32(e, 4294967295 + t + 1, r, n, i))
        }

        function _writeFloat(e, t, r, n, i) {
            i || (assert(void 0 !== t && null !== t, "missing value"), assert("boolean" == typeof n, "missing or invalid endian"), assert(void 0 !== r && null !== r, "missing offset"), assert(r + 3 < e.length, "Trying to write beyond buffer length"), verifIEEE754(t, 3.4028234663852886e38, -3.4028234663852886e38));
            var s = e.length;
            r >= s || ieee754.write(e, t, r, n, 23, 4)
        }

        function _writeDouble(e, t, r, n, i) {
            i || (assert(void 0 !== t && null !== t, "missing value"), assert("boolean" == typeof n, "missing or invalid endian"), assert(void 0 !== r && null !== r, "missing offset"), assert(r + 7 < e.length, "Trying to write beyond buffer length"), verifIEEE754(t, 1.7976931348623157e308, -1.7976931348623157e308));
            var s = e.length;
            r >= s || ieee754.write(e, t, r, n, 52, 8)
        }

        function stringtrim(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
        }

        function clamp(e, t, r) {
            return "number" != typeof e ? r : (e = ~~e, e >= t ? t : e >= 0 ? e : (e += t, e >= 0 ? e : 0))
        }

        function coerce(e) {
            return e = ~~Math.ceil(+e), 0 > e ? 0 : e
        }

        function isArray(e) {
            return (Array.isArray || function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            })(e)
        }

        function isArrayish(e) {
            return isArray(e) || Buffer.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
        }

        function toHex(e) {
            return 16 > e ? "0" + e.toString(16) : e.toString(16)
        }

        function utf8ToBytes(e) {
            for (var t = [], r = 0; r < e.length; r++) {
                var n = e.charCodeAt(r);
                if (127 >= n)t.push(e.charCodeAt(r)); else {
                    var i = r;
                    n >= 55296 && 57343 >= n && r++;
                    for (var s = encodeURIComponent(e.slice(i, r + 1)).substr(1).split("%"), a = 0; a < s.length; a++)t.push(parseInt(s[a], 16))
                }
            }
            return t
        }

        function asciiToBytes(e) {
            for (var t = [], r = 0; r < e.length; r++)t.push(255 & e.charCodeAt(r));
            return t
        }

        function utf16leToBytes(e) {
            for (var t, r, n, i = [], s = 0; s < e.length; s++)t = e.charCodeAt(s), r = t >> 8, n = t % 256, i.push(n), i.push(r);
            return i
        }

        function base64ToBytes(e) {
            return base64.toByteArray(e)
        }

        function blitBuffer(e, t, r, n) {
            for (var i = 0; n > i && !(i + r >= t.length || i >= e.length); i++)t[i + r] = e[i];
            return i
        }

        function decodeUtf8Char(e) {
            try {
                return decodeURIComponent(e)
            } catch (t) {
                return String.fromCharCode(65533)
            }
        }

        function verifuint(e, t) {
            assert("number" == typeof e, "cannot write a non-number as a number"), assert(e >= 0, "specified a negative value for writing an unsigned value"), assert(t >= e, "value is larger than maximum value for type"), assert(Math.floor(e) === e, "value has a fractional component")
        }

        function verifsint(e, t, r) {
            assert("number" == typeof e, "cannot write a non-number as a number"), assert(t >= e, "value larger than maximum allowed value"), assert(e >= r, "value smaller than minimum allowed value"), assert(Math.floor(e) === e, "value has a fractional component")
        }

        function verifIEEE754(e, t, r) {
            assert("number" == typeof e, "cannot write a non-number as a number"), assert(t >= e, "value larger than maximum allowed value"), assert(e >= r, "value smaller than minimum allowed value")
        }

        function assert(e, t) {
            if (!e)throw new Error(t || "Failed assertion")
        }

        var base64 = require("base64-js"), ieee754 = require("ieee754");
        exports.Buffer = Buffer, exports.SlowBuffer = Buffer, exports.INSPECT_MAX_BYTES = 50, Buffer.poolSize = 8192, Buffer._useTypedArrays = function () {
            try {
                var e = new ArrayBuffer(0), t = new Uint8Array(e);
                return t.foo = function () {
                    return 42
                }, 42 === t.foo() && "function" == typeof t.subarray
            } catch (r) {
                return !1
            }
        }(), Buffer.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
                case"hex":
                case"utf8":
                case"utf-8":
                case"ascii":
                case"binary":
                case"base64":
                case"raw":
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, Buffer.isBuffer = function (e) {
            return !(null === e || void 0 === e || !e._isBuffer)
        }, Buffer.byteLength = function (e, t) {
            var r;
            switch (e += "", t || "utf8") {
                case"hex":
                    r = e.length / 2;
                    break;
                case"utf8":
                case"utf-8":
                    r = utf8ToBytes(e).length;
                    break;
                case"ascii":
                case"binary":
                case"raw":
                    r = e.length;
                    break;
                case"base64":
                    r = base64ToBytes(e).length;
                    break;
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    r = 2 * e.length;
                    break;
                default:
                    throw new Error("Unknown encoding")
            }
            return r
        }, Buffer.concat = function (e, t) {
            if (assert(isArray(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e.length)return new Buffer(0);
            if (1 === e.length)return e[0];
            var r;
            if ("number" != typeof t)for (t = 0, r = 0; r < e.length; r++)t += e[r].length;
            var n = new Buffer(t), i = 0;
            for (r = 0; r < e.length; r++) {
                var s = e[r];
                s.copy(n, i), i += s.length
            }
            return n
        }, Buffer.prototype.write = function (e, t, r, n) {
            if (isFinite(t))isFinite(r) || (n = r, r = void 0); else {
                var i = n;
                n = t, t = r, r = i
            }
            t = Number(t) || 0;
            var s = this.length - t;
            r ? (r = Number(r), r > s && (r = s)) : r = s, n = String(n || "utf8").toLowerCase();
            var a;
            switch (n) {
                case"hex":
                    a = _hexWrite(this, e, t, r);
                    break;
                case"utf8":
                case"utf-8":
                    a = _utf8Write(this, e, t, r);
                    break;
                case"ascii":
                    a = _asciiWrite(this, e, t, r);
                    break;
                case"binary":
                    a = _binaryWrite(this, e, t, r);
                    break;
                case"base64":
                    a = _base64Write(this, e, t, r);
                    break;
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    a = _utf16leWrite(this, e, t, r);
                    break;
                default:
                    throw new Error("Unknown encoding")
            }
            return a
        }, Buffer.prototype.toString = function (e, t, r) {
            var n = this;
            if (e = String(e || "utf8").toLowerCase(), t = Number(t) || 0, r = void 0 !== r ? Number(r) : r = n.length, r === t)return "";
            var i;
            switch (e) {
                case"hex":
                    i = _hexSlice(n, t, r);
                    break;
                case"utf8":
                case"utf-8":
                    i = _utf8Slice(n, t, r);
                    break;
                case"ascii":
                    i = _asciiSlice(n, t, r);
                    break;
                case"binary":
                    i = _binarySlice(n, t, r);
                    break;
                case"base64":
                    i = _base64Slice(n, t, r);
                    break;
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                    i = _utf16leSlice(n, t, r);
                    break;
                default:
                    throw new Error("Unknown encoding")
            }
            return i
        }, Buffer.prototype.toJSON = function () {
            return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
        }, Buffer.prototype.copy = function (e, t, r, n) {
            var i = this;
            if (r || (r = 0), n || 0 === n || (n = this.length), t || (t = 0), n !== r && 0 !== e.length && 0 !== i.length) {
                assert(n >= r, "sourceEnd < sourceStart"), assert(t >= 0 && t < e.length, "targetStart out of bounds"), assert(r >= 0 && r < i.length, "sourceStart out of bounds"), assert(n >= 0 && n <= i.length, "sourceEnd out of bounds"), n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                var s = n - r;
                if (100 > s || !Buffer._useTypedArrays)for (var a = 0; s > a; a++)e[a + t] = this[a + r]; else e._set(this.subarray(r, r + s), t)
            }
        }, Buffer.prototype.slice = function (e, t) {
            var r = this.length;
            if (e = clamp(e, r, 0), t = clamp(t, r, r), Buffer._useTypedArrays)return Buffer._augment(this.subarray(e, t));
            for (var n = t - e, i = new Buffer(n, void 0, !0), s = 0; n > s; s++)i[s] = this[s + e];
            return i
        }, Buffer.prototype.get = function (e) {
            return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
        }, Buffer.prototype.set = function (e, t) {
            return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
        }, Buffer.prototype.readUInt8 = function (e, t) {
            return t || (assert(void 0 !== e && null !== e, "missing offset"), assert(e < this.length, "Trying to read beyond buffer length")), e >= this.length ? void 0 : this[e]
        }, Buffer.prototype.readUInt16LE = function (e, t) {
            return _readUInt16(this, e, !0, t)
        }, Buffer.prototype.readUInt16BE = function (e, t) {
            return _readUInt16(this, e, !1, t)
        }, Buffer.prototype.readUInt32LE = function (e, t) {
            return _readUInt32(this, e, !0, t)
        }, Buffer.prototype.readUInt32BE = function (e, t) {
            return _readUInt32(this, e, !1, t)
        }, Buffer.prototype.readInt8 = function (e, t) {
            if (t || (assert(void 0 !== e && null !== e, "missing offset"), assert(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) {
                var r = 128 & this[e];
                return r ? -1 * (255 - this[e] + 1) : this[e]
            }
        }, Buffer.prototype.readInt16LE = function (e, t) {
            return _readInt16(this, e, !0, t)
        }, Buffer.prototype.readInt16BE = function (e, t) {
            return _readInt16(this, e, !1, t)
        }, Buffer.prototype.readInt32LE = function (e, t) {
            return _readInt32(this, e, !0, t)
        }, Buffer.prototype.readInt32BE = function (e, t) {
            return _readInt32(this, e, !1, t)
        }, Buffer.prototype.readFloatLE = function (e, t) {
            return _readFloat(this, e, !0, t)
        }, Buffer.prototype.readFloatBE = function (e, t) {
            return _readFloat(this, e, !1, t)
        }, Buffer.prototype.readDoubleLE = function (e, t) {
            return _readDouble(this, e, !0, t)
        }, Buffer.prototype.readDoubleBE = function (e, t) {
            return _readDouble(this, e, !1, t)
        }, Buffer.prototype.writeUInt8 = function (e, t, r) {
            r || (assert(void 0 !== e && null !== e, "missing value"), assert(void 0 !== t && null !== t, "missing offset"), assert(t < this.length, "trying to write beyond buffer length"), verifuint(e, 255)), t >= this.length || (this[t] = e)
        }, Buffer.prototype.writeUInt16LE = function (e, t, r) {
            _writeUInt16(this, e, t, !0, r)
        }, Buffer.prototype.writeUInt16BE = function (e, t, r) {
            _writeUInt16(this, e, t, !1, r)
        }, Buffer.prototype.writeUInt32LE = function (e, t, r) {
            _writeUInt32(this, e, t, !0, r)
        }, Buffer.prototype.writeUInt32BE = function (e, t, r) {
            _writeUInt32(this, e, t, !1, r)
        }, Buffer.prototype.writeInt8 = function (e, t, r) {
            r || (assert(void 0 !== e && null !== e, "missing value"), assert(void 0 !== t && null !== t, "missing offset"), assert(t < this.length, "Trying to write beyond buffer length"), verifsint(e, 127, -128)), t >= this.length || (e >= 0 ? this.writeUInt8(e, t, r) : this.writeUInt8(255 + e + 1, t, r))
        }, Buffer.prototype.writeInt16LE = function (e, t, r) {
            _writeInt16(this, e, t, !0, r)
        }, Buffer.prototype.writeInt16BE = function (e, t, r) {
            _writeInt16(this, e, t, !1, r)
        }, Buffer.prototype.writeInt32LE = function (e, t, r) {
            _writeInt32(this, e, t, !0, r)
        }, Buffer.prototype.writeInt32BE = function (e, t, r) {
            _writeInt32(this, e, t, !1, r)
        }, Buffer.prototype.writeFloatLE = function (e, t, r) {
            _writeFloat(this, e, t, !0, r)
        }, Buffer.prototype.writeFloatBE = function (e, t, r) {
            _writeFloat(this, e, t, !1, r)
        }, Buffer.prototype.writeDoubleLE = function (e, t, r) {
            _writeDouble(this, e, t, !0, r)
        }, Buffer.prototype.writeDoubleBE = function (e, t, r) {
            _writeDouble(this, e, t, !1, r)
        }, Buffer.prototype.fill = function (e, t, r) {
            if (e || (e = 0), t || (t = 0), r || (r = this.length), "string" == typeof e && (e = e.charCodeAt(0)), assert("number" == typeof e && !isNaN(e), "value is not a number"), assert(r >= t, "end < start"), r !== t && 0 !== this.length) {
                assert(t >= 0 && t < this.length, "start out of bounds"), assert(r >= 0 && r <= this.length, "end out of bounds");
                for (var n = t; r > n; n++)this[n] = e
            }
        }, Buffer.prototype.inspect = function () {
            for (var e = [], t = this.length, r = 0; t > r; r++)if (e[r] = toHex(this[r]), r === exports.INSPECT_MAX_BYTES) {
                e[r + 1] = "...";
                break
            }
            return "<Buffer " + e.join(" ") + ">"
        }, Buffer.prototype.toArrayBuffer = function () {
            if ("undefined" != typeof Uint8Array) {
                if (Buffer._useTypedArrays)return new Buffer(this).buffer;
                for (var e = new Uint8Array(this.length), t = 0, r = e.length; r > t; t += 1)e[t] = this[t];
                return e.buffer
            }
            throw new Error("Buffer.toArrayBuffer not supported in this browser")
        };
        var BP = Buffer.prototype;
        Buffer._augment = function (e) {
            return e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = BP.get, e.set = BP.set, e.write = BP.write, e.toString = BP.toString, e.toLocaleString = BP.toString, e.toJSON = BP.toJSON, e.copy = BP.copy, e.slice = BP.slice, e.readUInt8 = BP.readUInt8, e.readUInt16LE = BP.readUInt16LE, e.readUInt16BE = BP.readUInt16BE, e.readUInt32LE = BP.readUInt32LE, e.readUInt32BE = BP.readUInt32BE, e.readInt8 = BP.readInt8, e.readInt16LE = BP.readInt16LE, e.readInt16BE = BP.readInt16BE, e.readInt32LE = BP.readInt32LE, e.readInt32BE = BP.readInt32BE, e.readFloatLE = BP.readFloatLE, e.readFloatBE = BP.readFloatBE, e.readDoubleLE = BP.readDoubleLE, e.readDoubleBE = BP.readDoubleBE, e.writeUInt8 = BP.writeUInt8, e.writeUInt16LE = BP.writeUInt16LE, e.writeUInt16BE = BP.writeUInt16BE, e.writeUInt32LE = BP.writeUInt32LE, e.writeUInt32BE = BP.writeUInt32BE, e.writeInt8 = BP.writeInt8, e.writeInt16LE = BP.writeInt16LE, e.writeInt16BE = BP.writeInt16BE, e.writeInt32LE = BP.writeInt32LE, e.writeInt32BE = BP.writeInt32BE, e.writeFloatLE = BP.writeFloatLE, e.writeFloatBE = BP.writeFloatBE, e.writeDoubleLE = BP.writeDoubleLE, e.writeDoubleBE = BP.writeDoubleBE, e.fill = BP.fill, e.inspect = BP.inspect, e.toArrayBuffer = BP.toArrayBuffer, e
        };
    }, {"base64-js": 79, "ieee754": 80}],
    79: [function (require, module, exports) {
        var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        !function (t) {
            "use strict";
            function r(t) {
                var r = t.charCodeAt(0);
                return r === h ? 62 : r === c ? 63 : o > r ? -1 : o + 10 > r ? r - o + 26 + 26 : i + 26 > r ? r - i : A + 26 > r ? r - A + 26 : void 0
            }

            function e(t) {
                function e(t) {
                    i[f++] = t
                }

                var n, h, c, o, A, i;
                if (t.length % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
                var u = t.length;
                A = "=" === t.charAt(u - 2) ? 2 : "=" === t.charAt(u - 1) ? 1 : 0, i = new a(3 * t.length / 4 - A), c = A > 0 ? t.length - 4 : t.length;
                var f = 0;
                for (n = 0, h = 0; c > n; n += 4, h += 3)o = r(t.charAt(n)) << 18 | r(t.charAt(n + 1)) << 12 | r(t.charAt(n + 2)) << 6 | r(t.charAt(n + 3)), e((16711680 & o) >> 16), e((65280 & o) >> 8), e(255 & o);
                return 2 === A ? (o = r(t.charAt(n)) << 2 | r(t.charAt(n + 1)) >> 4, e(255 & o)) : 1 === A && (o = r(t.charAt(n)) << 10 | r(t.charAt(n + 1)) << 4 | r(t.charAt(n + 2)) >> 2, e(o >> 8 & 255), e(255 & o)), i
            }

            function n(t) {
                function r(t) {
                    return lookup.charAt(t)
                }

                function e(t) {
                    return r(t >> 18 & 63) + r(t >> 12 & 63) + r(t >> 6 & 63) + r(63 & t)
                }

                var n, a, h, c = t.length % 3, o = "";
                for (n = 0, h = t.length - c; h > n; n += 3)a = (t[n] << 16) + (t[n + 1] << 8) + t[n + 2], o += e(a);
                switch (c) {
                    case 1:
                        a = t[t.length - 1], o += r(a >> 2), o += r(a << 4 & 63), o += "==";
                        break;
                    case 2:
                        a = (t[t.length - 2] << 8) + t[t.length - 1], o += r(a >> 10), o += r(a >> 4 & 63), o += r(a << 2 & 63), o += "="
                }
                return o
            }

            var a = "undefined" != typeof Uint8Array ? Uint8Array : Array, h = "+".charCodeAt(0), c = "/".charCodeAt(0), o = "0".charCodeAt(0), A = "a".charCodeAt(0), i = "A".charCodeAt(0);
            t.toByteArray = e, t.fromByteArray = n
        }("undefined" == typeof exports ? this.base64js = {} : exports);
    }, {}],
    80: [function (require, module, exports) {
        exports.read = function (o, t, a, r, h) {
            var M, p, w = 8 * h - r - 1, f = (1 << w) - 1, e = f >> 1, i = -7, n = a ? h - 1 : 0, s = a ? -1 : 1, N = o[t + n];
            for (n += s, M = N & (1 << -i) - 1, N >>= -i, i += w; i > 0; M = 256 * M + o[t + n], n += s, i -= 8);
            for (p = M & (1 << -i) - 1, M >>= -i, i += r; i > 0; p = 256 * p + o[t + n], n += s, i -= 8);
            if (0 === M)M = 1 - e; else {
                if (M === f)return p ? 0 / 0 : 1 / 0 * (N ? -1 : 1);
                p += Math.pow(2, r), M -= e
            }
            return (N ? -1 : 1) * p * Math.pow(2, M - r)
        }, exports.write = function (o, t, a, r, h, M) {
            var p, w, f, e = 8 * M - h - 1, i = (1 << e) - 1, n = i >> 1, s = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0, N = r ? 0 : M - 1, u = r ? 1 : -1, l = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || 1 / 0 === t ? (w = isNaN(t) ? 1 : 0, p = i) : (p = Math.floor(Math.log(t) / Math.LN2), t * (f = Math.pow(2, -p)) < 1 && (p--, f *= 2), t += p + n >= 1 ? s / f : s * Math.pow(2, 1 - n), t * f >= 2 && (p++, f /= 2), p + n >= i ? (w = 0, p = i) : p + n >= 1 ? (w = (t * f - 1) * Math.pow(2, h), p += n) : (w = t * Math.pow(2, n - 1) * Math.pow(2, h), p = 0)); h >= 8; o[a + N] = 255 & w, N += u, w /= 256, h -= 8);
            for (p = p << h | w, e += h; e > 0; o[a + N] = 255 & p, N += u, p /= 256, e -= 8);
            o[a + N - u] |= 128 * l
        };
    }, {}],
    81: [function (require, module, exports) {
        function toArray(r, e) {
            if (r.length % intSize !== 0) {
                var f = r.length + (intSize - r.length % intSize);
                r = Buffer.concat([r, zeroBuffer], f)
            }
            for (var t = [], n = e ? r.readInt32BE : r.readInt32LE, u = 0; u < r.length; u += intSize)t.push(n.call(r, u));
            return t
        }

        function toBuffer(r, e, f) {
            for (var t = new Buffer(e), n = f ? t.writeInt32BE : t.writeInt32LE, u = 0; u < r.length; u++)n.call(t, r[u], 4 * u, !0);
            return t
        }

        function hash(r, e, f, t) {
            Buffer.isBuffer(r) || (r = new Buffer(r));
            var n = e(toArray(r, t), r.length * chrsz);
            return toBuffer(n, f, t)
        }

        var Buffer = require("buffer").Buffer, intSize = 4, zeroBuffer = new Buffer(intSize);
        zeroBuffer.fill(0);
        var chrsz = 8;
        module.exports = {hash: hash};
    }, {"buffer": 78}],
    82: [function (require, module, exports) {
        function hmac(e, r, f) {
            Buffer.isBuffer(r) || (r = new Buffer(r)), Buffer.isBuffer(f) || (f = new Buffer(f)), r.length > blocksize ? r = e(r) : r.length < blocksize && (r = Buffer.concat([r, zeroBuffer], blocksize));
            for (var t = new Buffer(blocksize), n = new Buffer(blocksize), i = 0; blocksize > i; i++)t[i] = 54 ^ r[i], n[i] = 92 ^ r[i];
            var c = e(Buffer.concat([t, f]));
            return e(Buffer.concat([n, c]))
        }

        function hash(e, r) {
            e = e || "sha1";
            var f = algorithms[e], t = [], n = 0;
            return f || error("algorithm:", e, "is not yet supported"), {
                update: function (e) {
                    return Buffer.isBuffer(e) || (e = new Buffer(e)), t.push(e), n += e.length, this
                }, digest: function (e) {
                    var n = Buffer.concat(t), i = r ? hmac(f, r, n) : f(n);
                    return t = null, e ? i.toString(e) : i
                }
            }
        }

        function error() {
            var e = [].slice.call(arguments).join(" ");
            throw new Error([e, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"))
        }

        function each(e, r) {
            for (var f in e)r(e[f], f)
        }

        var Buffer = require("buffer").Buffer, sha = require("./sha"), sha256 = require("./sha256"), rng = require("./rng"), md5 = require("./md5"), algorithms = {
            sha1: sha,
            sha256: sha256,
            md5: md5
        }, blocksize = 64, zeroBuffer = new Buffer(blocksize);
        zeroBuffer.fill(0), exports.createHash = function (e) {
            return hash(e)
        }, exports.createHmac = function (e, r) {
            return hash(e, r)
        }, exports.randomBytes = function (e, r) {
            if (!r || !r.call)return new Buffer(rng(e));
            try {
                r.call(this, void 0, new Buffer(rng(e)))
            } catch (f) {
                r(f)
            }
        }, each(["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], function (e) {
            exports[e] = function () {
                error("sorry,", e, "is not implemented yet")
            }
        });
    }, {"./md5": 83, "./rng": 84, "./sha": 85, "./sha256": 86, "buffer": 78}],
    83: [function (require, module, exports) {
        function md5_vm_test() {
            return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
        }

        function core_md5(d, _) {
            d[_ >> 5] |= 128 << _ % 32, d[(_ + 64 >>> 9 << 4) + 14] = _;
            for (var m = 1732584193, f = -271733879, i = -1732584194, h = 271733878, r = 0; r < d.length; r += 16) {
                var n = m, e = f, g = i, t = h;
                m = md5_ff(m, f, i, h, d[r + 0], 7, -680876936), h = md5_ff(h, m, f, i, d[r + 1], 12, -389564586), i = md5_ff(i, h, m, f, d[r + 2], 17, 606105819), f = md5_ff(f, i, h, m, d[r + 3], 22, -1044525330), m = md5_ff(m, f, i, h, d[r + 4], 7, -176418897), h = md5_ff(h, m, f, i, d[r + 5], 12, 1200080426), i = md5_ff(i, h, m, f, d[r + 6], 17, -1473231341), f = md5_ff(f, i, h, m, d[r + 7], 22, -45705983), m = md5_ff(m, f, i, h, d[r + 8], 7, 1770035416), h = md5_ff(h, m, f, i, d[r + 9], 12, -1958414417), i = md5_ff(i, h, m, f, d[r + 10], 17, -42063), f = md5_ff(f, i, h, m, d[r + 11], 22, -1990404162), m = md5_ff(m, f, i, h, d[r + 12], 7, 1804603682), h = md5_ff(h, m, f, i, d[r + 13], 12, -40341101), i = md5_ff(i, h, m, f, d[r + 14], 17, -1502002290), f = md5_ff(f, i, h, m, d[r + 15], 22, 1236535329), m = md5_gg(m, f, i, h, d[r + 1], 5, -165796510), h = md5_gg(h, m, f, i, d[r + 6], 9, -1069501632), i = md5_gg(i, h, m, f, d[r + 11], 14, 643717713), f = md5_gg(f, i, h, m, d[r + 0], 20, -373897302), m = md5_gg(m, f, i, h, d[r + 5], 5, -701558691), h = md5_gg(h, m, f, i, d[r + 10], 9, 38016083), i = md5_gg(i, h, m, f, d[r + 15], 14, -660478335), f = md5_gg(f, i, h, m, d[r + 4], 20, -405537848), m = md5_gg(m, f, i, h, d[r + 9], 5, 568446438), h = md5_gg(h, m, f, i, d[r + 14], 9, -1019803690), i = md5_gg(i, h, m, f, d[r + 3], 14, -187363961), f = md5_gg(f, i, h, m, d[r + 8], 20, 1163531501), m = md5_gg(m, f, i, h, d[r + 13], 5, -1444681467), h = md5_gg(h, m, f, i, d[r + 2], 9, -51403784), i = md5_gg(i, h, m, f, d[r + 7], 14, 1735328473), f = md5_gg(f, i, h, m, d[r + 12], 20, -1926607734), m = md5_hh(m, f, i, h, d[r + 5], 4, -378558), h = md5_hh(h, m, f, i, d[r + 8], 11, -2022574463), i = md5_hh(i, h, m, f, d[r + 11], 16, 1839030562), f = md5_hh(f, i, h, m, d[r + 14], 23, -35309556), m = md5_hh(m, f, i, h, d[r + 1], 4, -1530992060), h = md5_hh(h, m, f, i, d[r + 4], 11, 1272893353), i = md5_hh(i, h, m, f, d[r + 7], 16, -155497632), f = md5_hh(f, i, h, m, d[r + 10], 23, -1094730640), m = md5_hh(m, f, i, h, d[r + 13], 4, 681279174), h = md5_hh(h, m, f, i, d[r + 0], 11, -358537222), i = md5_hh(i, h, m, f, d[r + 3], 16, -722521979), f = md5_hh(f, i, h, m, d[r + 6], 23, 76029189), m = md5_hh(m, f, i, h, d[r + 9], 4, -640364487), h = md5_hh(h, m, f, i, d[r + 12], 11, -421815835), i = md5_hh(i, h, m, f, d[r + 15], 16, 530742520), f = md5_hh(f, i, h, m, d[r + 2], 23, -995338651), m = md5_ii(m, f, i, h, d[r + 0], 6, -198630844), h = md5_ii(h, m, f, i, d[r + 7], 10, 1126891415), i = md5_ii(i, h, m, f, d[r + 14], 15, -1416354905), f = md5_ii(f, i, h, m, d[r + 5], 21, -57434055), m = md5_ii(m, f, i, h, d[r + 12], 6, 1700485571), h = md5_ii(h, m, f, i, d[r + 3], 10, -1894986606), i = md5_ii(i, h, m, f, d[r + 10], 15, -1051523), f = md5_ii(f, i, h, m, d[r + 1], 21, -2054922799), m = md5_ii(m, f, i, h, d[r + 8], 6, 1873313359), h = md5_ii(h, m, f, i, d[r + 15], 10, -30611744), i = md5_ii(i, h, m, f, d[r + 6], 15, -1560198380), f = md5_ii(f, i, h, m, d[r + 13], 21, 1309151649), m = md5_ii(m, f, i, h, d[r + 4], 6, -145523070), h = md5_ii(h, m, f, i, d[r + 11], 10, -1120210379), i = md5_ii(i, h, m, f, d[r + 2], 15, 718787259), f = md5_ii(f, i, h, m, d[r + 9], 21, -343485551), m = safe_add(m, n), f = safe_add(f, e), i = safe_add(i, g), h = safe_add(h, t)
            }
            return Array(m, f, i, h)
        }

        function md5_cmn(d, _, m, f, i, h) {
            return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, h)), i), m)
        }

        function md5_ff(d, _, m, f, i, h, r) {
            return md5_cmn(_ & m | ~_ & f, d, _, i, h, r)
        }

        function md5_gg(d, _, m, f, i, h, r) {
            return md5_cmn(_ & f | m & ~f, d, _, i, h, r)
        }

        function md5_hh(d, _, m, f, i, h, r) {
            return md5_cmn(_ ^ m ^ f, d, _, i, h, r)
        }

        function md5_ii(d, _, m, f, i, h, r) {
            return md5_cmn(m ^ (_ | ~f), d, _, i, h, r)
        }

        function safe_add(d, _) {
            var m = (65535 & d) + (65535 & _), f = (d >> 16) + (_ >> 16) + (m >> 16);
            return f << 16 | 65535 & m
        }

        function bit_rol(d, _) {
            return d << _ | d >>> 32 - _
        }

        var helpers = require("./helpers");
        module.exports = function (d) {
            return helpers.hash(d, core_md5, 16)
        };
    }, {"./helpers": 81}],
    84: [function (require, module, exports) {
        !function () {
            var r, n, t = this;
            r = function (r) {
                for (var n, n, t = new Array(r), o = 0; r > o; o++)0 == (3 & o) && (n = 4294967296 * Math.random()), t[o] = n >>> ((3 & o) << 3) & 255;
                return t
            }, t.crypto && crypto.getRandomValues && (n = function (r) {
                var n = new Uint8Array(r);
                return crypto.getRandomValues(n), n
            }), module.exports = n || r
        }();
    }, {}],
    85: [function (require, module, exports) {
        function core_sha1(r, a) {
            r[a >> 5] |= 128 << 24 - a % 32, r[(a + 64 >> 9 << 4) + 15] = a;
            for (var e = Array(80), d = 1732584193, s = -271733879, f = -1732584194, n = 271733878, t = -1009589776, o = 0; o < r.length; o += 16) {
                for (var _ = d, u = s, h = f, l = n, c = t, i = 0; 80 > i; i++) {
                    e[i] = 16 > i ? r[o + i] : rol(e[i - 3] ^ e[i - 8] ^ e[i - 14] ^ e[i - 16], 1);
                    var v = safe_add(safe_add(rol(d, 5), sha1_ft(i, s, f, n)), safe_add(safe_add(t, e[i]), sha1_kt(i)));
                    t = n, n = f, f = rol(s, 30), s = d, d = v
                }
                d = safe_add(d, _), s = safe_add(s, u), f = safe_add(f, h), n = safe_add(n, l), t = safe_add(t, c)
            }
            return Array(d, s, f, n, t)
        }

        function sha1_ft(r, a, e, d) {
            return 20 > r ? a & e | ~a & d : 40 > r ? a ^ e ^ d : 60 > r ? a & e | a & d | e & d : a ^ e ^ d
        }

        function sha1_kt(r) {
            return 20 > r ? 1518500249 : 40 > r ? 1859775393 : 60 > r ? -1894007588 : -899497514
        }

        function safe_add(r, a) {
            var e = (65535 & r) + (65535 & a), d = (r >> 16) + (a >> 16) + (e >> 16);
            return d << 16 | 65535 & e
        }

        function rol(r, a) {
            return r << a | r >>> 32 - a
        }

        var helpers = require("./helpers");
        module.exports = function (r) {
            return helpers.hash(r, core_sha1, 20, !0)
        };
    }, {"./helpers": 81}],
    86: [function (require, module, exports) {
        var helpers = require("./helpers"), safe_add = function (a, e) {
            var r = (65535 & a) + (65535 & e), d = (a >> 16) + (e >> 16) + (r >> 16);
            return d << 16 | 65535 & r
        }, S = function (a, e) {
            return a >>> e | a << 32 - e
        }, R = function (a, e) {
            return a >>> e
        }, Ch = function (a, e, r) {
            return a & e ^ ~a & r
        }, Maj = function (a, e, r) {
            return a & e ^ a & r ^ e & r
        }, Sigma0256 = function (a) {
            return S(a, 2) ^ S(a, 13) ^ S(a, 22)
        }, Sigma1256 = function (a) {
            return S(a, 6) ^ S(a, 11) ^ S(a, 25)
        }, Gamma0256 = function (a) {
            return S(a, 7) ^ S(a, 18) ^ R(a, 3)
        }, Gamma1256 = function (a) {
            return S(a, 17) ^ S(a, 19) ^ R(a, 10)
        }, core_sha256 = function (a, e) {
            var r, d, n, f, s, t, u, _, o, i, S, c, m = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), h = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), g = new Array(64);
            a[e >> 5] |= 128 << 24 - e % 32, a[(e + 64 >> 9 << 4) + 15] = e;
            for (var o = 0; o < a.length; o += 16) {
                r = h[0], d = h[1], n = h[2], f = h[3], s = h[4], t = h[5], u = h[6], _ = h[7];
                for (var i = 0; 64 > i; i++)g[i] = 16 > i ? a[i + o] : safe_add(safe_add(safe_add(Gamma1256(g[i - 2]), g[i - 7]), Gamma0256(g[i - 15])), g[i - 16]), S = safe_add(safe_add(safe_add(safe_add(_, Sigma1256(s)), Ch(s, t, u)), m[i]), g[i]), c = safe_add(Sigma0256(r), Maj(r, d, n)), _ = u, u = t, t = s, s = safe_add(f, S), f = n, n = d, d = r, r = safe_add(S, c);
                h[0] = safe_add(r, h[0]), h[1] = safe_add(d, h[1]), h[2] = safe_add(n, h[2]), h[3] = safe_add(f, h[3]), h[4] = safe_add(s, h[4]), h[5] = safe_add(t, h[5]), h[6] = safe_add(u, h[6]), h[7] = safe_add(_, h[7])
            }
            return h
        };
        module.exports = function (a) {
            return helpers.hash(a, core_sha256, 32, !0)
        };
    }, {"./helpers": 81}],
    "events": [function (require, module, exports) {
        module.exports = require('T9Wsc/');
    }, {}],
    "T9Wsc/": [function (require, module, exports) {
        function EventEmitter() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function isFunction(e) {
            return "function" == typeof e
        }

        function isNumber(e) {
            return "number" == typeof e
        }

        function isObject(e) {
            return "object" == typeof e && null !== e
        }

        function isUndefined(e) {
            return void 0 === e
        }

        module.exports = EventEmitter, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.prototype.setMaxListeners = function (e) {
            if (!isNumber(e) || 0 > e || isNaN(e))throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, EventEmitter.prototype.emit = function (e) {
            var t, n, s, i, r, o;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || isObject(this._events.error) && !this._events.error.length))throw t = arguments[1], t instanceof Error ? t : TypeError('Uncaught, unspecified "error" event.');
            if (n = this._events[e], isUndefined(n))return !1;
            if (isFunction(n))switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for (s = arguments.length, i = new Array(s - 1), r = 1; s > r; r++)i[r - 1] = arguments[r];
                    n.apply(this, i)
            } else if (isObject(n)) {
                for (s = arguments.length, i = new Array(s - 1), r = 1; s > r; r++)i[r - 1] = arguments[r];
                for (o = n.slice(), s = o.length, r = 0; s > r; r++)o[r].apply(this, i)
            }
            return !0
        }, EventEmitter.prototype.addListener = function (e, t) {
            var n;
            if (!isFunction(t))throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, isFunction(t.listener) ? t.listener : t), this._events[e] ? isObject(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, isObject(this._events[e]) && !this._events[e].warned) {
                var n;
                n = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function (e, t) {
            function n() {
                this.removeListener(e, n), s || (s = !0, t.apply(this, arguments))
            }

            if (!isFunction(t))throw TypeError("listener must be a function");
            var s = !1;
            return n.listener = t, this.on(e, n), this
        }, EventEmitter.prototype.removeListener = function (e, t) {
            var n, s, i, r;
            if (!isFunction(t))throw TypeError("listener must be a function");
            if (!this._events || !this._events[e])return this;
            if (n = this._events[e], i = n.length, s = -1, n === t || isFunction(n.listener) && n.listener === t)delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t); else if (isObject(n)) {
                for (r = i; r-- > 0;)if (n[r] === t || n[r].listener && n[r].listener === t) {
                    s = r;
                    break
                }
                if (0 > s)return this;
                1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(s, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, EventEmitter.prototype.removeAllListeners = function (e) {
            var t, n;
            if (!this._events)return this;
            if (!this._events.removeListener)return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events)"removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (n = this._events[e], isFunction(n))this.removeListener(e, n); else for (; n.length;)this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this
        }, EventEmitter.prototype.listeners = function (e) {
            var t;
            return t = this._events && this._events[e] ? isFunction(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, EventEmitter.listenerCount = function (e, t) {
            var n;
            return n = e._events && e._events[t] ? isFunction(e._events[t]) ? 1 : e._events[t].length : 0
        };
    }, {}],
    89: [function (require, module, exports) {
        var http = module.exports, EventEmitter = require("events").EventEmitter, Request = require("./lib/request"), url = require("url");
        http.request = function (e, t) {
            "string" == typeof e && (e = url.parse(e)), e || (e = {}), e.host || e.port || (e.port = parseInt(window.location.port, 10)), !e.host && e.hostname && (e.host = e.hostname), e.scheme || (e.scheme = window.location.protocol.split(":")[0]), e.host || (e.host = window.location.hostname || window.location.host), /:/.test(e.host) && (e.port || (e.port = e.host.split(":")[1]), e.host = e.host.split(":")[0]), e.port || (e.port = "https" == e.scheme ? 443 : 80);
            var o = new Request(new xhrHttp, e);
            return t && o.on("response", t), o
        }, http.get = function (e, t) {
            e.method = "GET";
            var o = http.request(e, t);
            return o.end(), o
        }, http.Agent = function () {
        }, http.Agent.defaultMaxSockets = 4;
        var xhrHttp = function () {
            if ("undefined" == typeof window)throw new Error("no window object present");
            if (window.XMLHttpRequest)return window.XMLHttpRequest;
            if (window.ActiveXObject) {
                for (var e = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"], t = 0; t < e.length; t++)try {
                    var o = new window.ActiveXObject(e[t]);
                    return function () {
                        if (o) {
                            var r = o;
                            return o = null, r
                        }
                        return new window.ActiveXObject(e[t])
                    }
                } catch (r) {
                }
                throw new Error("ajax not supported in this browser")
            }
            throw new Error("ajax not supported in this browser")
        }();
        http.STATUS_CODES = {
            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Moved Temporarily",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Time-out",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Request Entity Too Large",
            414: "Request-URI Too Large",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            418: "I'm a teapot",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependency",
            425: "Unordered Collection",
            426: "Upgrade Required",
            428: "Precondition Required",
            429: "Too Many Requests",
            431: "Request Header Fields Too Large",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Time-out",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates",
            507: "Insufficient Storage",
            509: "Bandwidth Limit Exceeded",
            510: "Not Extended",
            511: "Network Authentication Required"
        };
    }, {"./lib/request": 90, "events": "T9Wsc/", "url": 109}],
    90: [function (require, module, exports) {
        var Stream = require("stream"), Response = require("./response"), Base64 = require("Base64"), inherits = require("inherits"), Request = module.exports = function (e, t) {
            var r = this;
            r.writable = !0, r.xhr = e, r.body = [], r.uri = (t.scheme || "http") + "://" + t.host + (t.port ? ":" + t.port : "") + (t.path || "/"), "undefined" == typeof t.withCredentials && (t.withCredentials = !0);
            try {
                e.withCredentials = t.withCredentials
            } catch (s) {
            }
            if (e.open(t.method || "GET", r.uri, !0), r._headers = {}, t.headers)for (var o = objectKeys(t.headers), i = 0; i < o.length; i++) {
                var n = o[i];
                if (r.isSafeRequestHeader(n)) {
                    var a = t.headers[n];
                    r.setHeader(n, a)
                }
            }
            t.auth && this.setHeader("Authorization", "Basic " + Base64.btoa(t.auth));
            var h = new Response;
            h.on("close", function () {
                r.emit("close")
            }), h.on("ready", function () {
                r.emit("response", h)
            }), e.onreadystatechange = function () {
                e.__aborted || h.handle(e)
            }
        };
        inherits(Request, Stream), Request.prototype.setHeader = function (e, t) {
            this._headers[e.toLowerCase()] = t
        }, Request.prototype.getHeader = function (e) {
            return this._headers[e.toLowerCase()]
        }, Request.prototype.removeHeader = function (e) {
            delete this._headers[e.toLowerCase()]
        }, Request.prototype.write = function (e) {
            this.body.push(e)
        }, Request.prototype.destroy = function () {
            this.xhr.__aborted = !0, this.xhr.abort(), this.emit("close")
        }, Request.prototype.end = function (e) {
            void 0 !== e && this.body.push(e);
            for (var t = objectKeys(this._headers), r = 0; r < t.length; r++) {
                var s = t[r], o = this._headers[s];
                if (isArray(o))for (var i = 0; i < o.length; i++)this.xhr.setRequestHeader(s, o[i]); else this.xhr.setRequestHeader(s, o)
            }
            if (0 === this.body.length)this.xhr.send(""); else if ("string" == typeof this.body[0])this.xhr.send(this.body.join("")); else if (isArray(this.body[0])) {
                for (var n = [], r = 0; r < this.body.length; r++)n.push.apply(n, this.body[r]);
                this.xhr.send(n)
            } else if (/Array/.test(Object.prototype.toString.call(this.body[0]))) {
                for (var a = 0, r = 0; r < this.body.length; r++)a += this.body[r].length;
                for (var n = new this.body[0].constructor(a), h = 0, r = 0; r < this.body.length; r++)for (var d = this.body[r], i = 0; i < d.length; i++)n[h++] = d[i];
                this.xhr.send(n)
            } else {
                for (var n = "", r = 0; r < this.body.length; r++)n += this.body[r].toString();
                this.xhr.send(n)
            }
        }, Request.unsafeHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"], Request.prototype.isSafeRequestHeader = function (e) {
            return e ? -1 === indexOf(Request.unsafeHeaders, e.toLowerCase()) : !1
        };
        var objectKeys = Object.keys || function (e) {
                var t = [];
                for (var r in e)t.push(r);
                return t
            }, isArray = Array.isArray || function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }, indexOf = function (e, t) {
            if (e.indexOf)return e.indexOf(t);
            for (var r = 0; r < e.length; r++)if (e[r] === t)return r;
            return -1
        };
    }, {"./response": 91, "Base64": 92, "inherits": 94, "stream": 102}],
    91: [function (require, module, exports) {
        function parseHeaders(e) {
            for (var t = e.getAllResponseHeaders().split(/\r?\n/), s = {}, r = 0; r < t.length; r++) {
                var a = t[r];
                if ("" !== a) {
                    var i = a.match(/^([^:]+):\s*(.*)/);
                    if (i) {
                        var o = i[1].toLowerCase(), n = i[2];
                        void 0 !== s[o] ? isArray(s[o]) ? s[o].push(n) : s[o] = [s[o], n] : s[o] = n
                    } else s[a] = !0
                }
            }
            return s
        }

        var Stream = require("stream"), util = require("util"), Response = module.exports = function () {
            this.offset = 0, this.readable = !0
        };
        util.inherits(Response, Stream);
        var capable = {streaming: !0, status2: !0};
        Response.prototype.getResponse = function (e) {
            var t = String(e.responseType).toLowerCase();
            return "blob" === t ? e.responseBlob || e.response : "arraybuffer" === t ? e.response : e.responseText
        }, Response.prototype.getHeader = function (e) {
            return this.headers[e.toLowerCase()]
        }, Response.prototype.handle = function (e) {
            if (2 === e.readyState && capable.status2) {
                try {
                    this.statusCode = e.status, this.headers = parseHeaders(e)
                } catch (t) {
                    capable.status2 = !1
                }
                capable.status2 && this.emit("ready")
            } else if (capable.streaming && 3 === e.readyState) {
                try {
                    this.statusCode || (this.statusCode = e.status, this.headers = parseHeaders(e), this.emit("ready"))
                } catch (t) {
                }
                try {
                    this._emitData(e)
                } catch (t) {
                    capable.streaming = !1
                }
            } else 4 === e.readyState && (this.statusCode || (this.statusCode = e.status, this.emit("ready")), this._emitData(e), e.error ? this.emit("error", this.getResponse(e)) : this.emit("end"), this.emit("close"))
        }, Response.prototype._emitData = function (e) {
            var t = this.getResponse(e);
            return t.toString().match(/ArrayBuffer/) ? (this.emit("data", new Uint8Array(t, this.offset)), void(this.offset = t.byteLength)) : void(t.length > this.offset && (this.emit("data", t.slice(this.offset)), this.offset = t.length))
        };
        var isArray = Array.isArray || function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
    }, {"stream": 102, "util": 111}],
    92: [function (require, module, exports) {
        !function () {
            function t(t) {
                this.message = t
            }

            var e = "undefined" != typeof exports ? exports : this, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            t.prototype = new Error, t.prototype.name = "InvalidCharacterError", e.btoa || (e.btoa = function (e) {
                for (var o, n, a = 0, i = r, c = ""; e.charAt(0 | a) || (i = "=", a % 1); c += i.charAt(63 & o >> 8 - a % 1 * 8)) {
                    if (n = e.charCodeAt(a += .75), n > 255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    o = o << 8 | n
                }
                return c
            }), e.atob || (e.atob = function (e) {
                if (e = e.replace(/=+$/, ""), e.length % 4 == 1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var o, n, a = 0, i = 0, c = ""; n = e.charAt(i++); ~n && (o = a % 4 ? 64 * o + n : n, a++ % 4) ? c += String.fromCharCode(255 & o >> (-2 * a & 6)) : 0)n = r.indexOf(n);
                return c
            })
        }();
    }, {}],
    93: [function (require, module, exports) {
        var http = require("http"), https = module.exports;
        for (var key in http)http.hasOwnProperty(key) && (https[key] = http[key]);
        https.request = function (t, e) {
            return t || (t = {}), t.scheme = "https", http.request.call(this, t, e)
        };
    }, {"http": 89}],
    94: [function (require, module, exports) {
        module.exports = "function" == typeof Object.create ? function (t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : function (t, e) {
            t.super_ = e;
            var o = function () {
            };
            o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
        };
    }, {}],
    95: [function (require, module, exports) {
        function noop() {
        }

        var process = module.exports = {};
        process.nextTick = function () {
            var o = "undefined" != typeof window && window.setImmediate, e = "undefined" != typeof window && window.postMessage && window.addEventListener;
            if (o)return function (o) {
                return window.setImmediate(o)
            };
            if (e) {
                var n = [];
                return window.addEventListener("message", function (o) {
                    var e = o.source;
                    if ((e === window || null === e) && "process-tick" === o.data && (o.stopPropagation(), n.length > 0)) {
                        var s = n.shift();
                        s()
                    }
                }, !0), function (o) {
                    n.push(o), window.postMessage("process-tick", "*")
                }
            }
            return function (o) {
                setTimeout(o, 0)
            }
        }(), process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.on = noop, process.once = noop, process.off = noop, process.emit = noop, process.binding = function () {
            throw new Error("process.binding is not supported")
        }, process.cwd = function () {
            return "/"
        }, process.chdir = function () {
            throw new Error("process.chdir is not supported")
        };
    }, {}],
    96: [function (require, module, exports) {
        (function (r) {
            function t(r, t) {
                for (var e = 0, n = r.length - 1; n >= 0; n--) {
                    var s = r[n];
                    "." === s ? r.splice(n, 1) : ".." === s ? (r.splice(n, 1), e++) : e && (r.splice(n, 1), e--)
                }
                if (t)for (; e--; e)r.unshift("..");
                return r
            }

            function e(r, t) {
                if (r.filter)return r.filter(t);
                for (var e = [], n = 0; n < r.length; n++)t(r[n], n, r) && e.push(r[n]);
                return e
            }

            var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, s = function (r) {
                return n.exec(r).slice(1)
            };
            exports.resolve = function () {
                for (var n = "", s = !1, o = arguments.length - 1; o >= -1 && !s; o--) {
                    var i = o >= 0 ? arguments[o] : r.cwd();
                    if ("string" != typeof i)throw new TypeError("Arguments to path.resolve must be strings");
                    i && (n = i + "/" + n, s = "/" === i.charAt(0))
                }
                return n = t(e(n.split("/"), function (r) {
                    return !!r
                }), !s).join("/"), (s ? "/" : "") + n || "."
            }, exports.normalize = function (r) {
                var n = exports.isAbsolute(r), s = "/" === o(r, -1);
                return r = t(e(r.split("/"), function (r) {
                    return !!r
                }), !n).join("/"), r || n || (r = "."), r && s && (r += "/"), (n ? "/" : "") + r
            }, exports.isAbsolute = function (r) {
                return "/" === r.charAt(0)
            }, exports.join = function () {
                var r = Array.prototype.slice.call(arguments, 0);
                return exports.normalize(e(r, function (r) {
                    if ("string" != typeof r)throw new TypeError("Arguments to path.join must be strings");
                    return r
                }).join("/"))
            }, exports.relative = function (r, t) {
                function e(r) {
                    for (var t = 0; t < r.length && "" === r[t]; t++);
                    for (var e = r.length - 1; e >= 0 && "" === r[e]; e--);
                    return t > e ? [] : r.slice(t, e - t + 1)
                }

                r = exports.resolve(r).substr(1), t = exports.resolve(t).substr(1);
                for (var n = e(r.split("/")), s = e(t.split("/")), o = Math.min(n.length, s.length), i = o, u = 0; o > u; u++)if (n[u] !== s[u]) {
                    i = u;
                    break
                }
                for (var l = [], u = i; u < n.length; u++)l.push("..");
                return l = l.concat(s.slice(i)), l.join("/")
            }, exports.sep = "/", exports.delimiter = ":", exports.dirname = function (r) {
                var t = s(r), e = t[0], n = t[1];
                return e || n ? (n && (n = n.substr(0, n.length - 1)), e + n) : "."
            }, exports.basename = function (r, t) {
                var e = s(r)[2];
                return t && e.substr(-1 * t.length) === t && (e = e.substr(0, e.length - t.length)), e
            }, exports.extname = function (r) {
                return s(r)[3]
            };
            var o = "b" === "ab".substr(-1) ? function (r, t, e) {
                return r.substr(t, e)
            } : function (r, t, e) {
                return 0 > t && (t = r.length + t), r.substr(t, e)
            }
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"));
    }, {"/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95}],
    97: [function (require, module, exports) {
        (function (e) {
            !function (o) {
                function n(e) {
                    throw RangeError(M[e])
                }

                function t(e, o) {
                    for (var n = e.length; n--;)e[n] = o(e[n]);
                    return e
                }

                function r(e, o) {
                    return t(e.split(L), o).join(".")
                }

                function f(e) {
                    for (var o, n, t = [], r = 0, f = e.length; f > r;)o = e.charCodeAt(r++), o >= 55296 && 56319 >= o && f > r ? (n = e.charCodeAt(r++), 56320 == (64512 & n) ? t.push(((1023 & o) << 10) + (1023 & n) + 65536) : (t.push(o), r--)) : t.push(o);
                    return t
                }

                function i(e) {
                    return t(e, function (e) {
                        var o = "";
                        return e > 65535 && (e -= 65536, o += T(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += T(e)
                    }).join("")
                }

                function u(e) {
                    return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : C
                }

                function c(e, o) {
                    return e + 22 + 75 * (26 > e) - ((0 != o) << 5)
                }

                function d(e, o, n) {
                    var t = 0;
                    for (e = n ? R(e / A) : e >> 1, e += R(e / o); e > P * j >> 1; t += C)e = R(e / P);
                    return R(t + (P + 1) * e / (e + m))
                }

                function l(e) {
                    var o, t, r, f, c, l, s, p, a, h, v = [], w = e.length, g = 0, y = F, m = I;
                    for (t = e.lastIndexOf(E), 0 > t && (t = 0), r = 0; t > r; ++r)e.charCodeAt(r) >= 128 && n("not-basic"), v.push(e.charCodeAt(r));
                    for (f = t > 0 ? t + 1 : 0; w > f;) {
                        for (c = g, l = 1, s = C; f >= w && n("invalid-input"), p = u(e.charCodeAt(f++)), (p >= C || p > R((x - g) / l)) && n("overflow"), g += p * l, a = m >= s ? b : s >= m + j ? j : s - m, !(a > p); s += C)h = C - a, l > R(x / h) && n("overflow"), l *= h;
                        o = v.length + 1, m = d(g - c, o, 0 == c), R(g / o) > x - y && n("overflow"), y += R(g / o), g %= o, v.splice(g++, 0, y)
                    }
                    return i(v)
                }

                function s(e) {
                    var o, t, r, i, u, l, s, p, a, h, v, w, g, y, m, A = [];
                    for (e = f(e), w = e.length, o = F, t = 0, u = I, l = 0; w > l; ++l)v = e[l], 128 > v && A.push(T(v));
                    for (r = i = A.length, i && A.push(E); w > r;) {
                        for (s = x, l = 0; w > l; ++l)v = e[l], v >= o && s > v && (s = v);
                        for (g = r + 1, s - o > R((x - t) / g) && n("overflow"), t += (s - o) * g, o = s, l = 0; w > l; ++l)if (v = e[l], o > v && ++t > x && n("overflow"), v == o) {
                            for (p = t, a = C; h = u >= a ? b : a >= u + j ? j : a - u, !(h > p); a += C)m = p - h, y = C - h, A.push(T(c(h + m % y, 0))), p = R(m / y);
                            A.push(T(c(p, 0))), u = d(t, g, r == i), t = 0, ++r
                        }
                        ++t, ++o
                    }
                    return A.join("")
                }

                function p(e) {
                    return r(e, function (e) {
                        return O.test(e) ? l(e.slice(4).toLowerCase()) : e
                    })
                }

                function a(e) {
                    return r(e, function (e) {
                        return S.test(e) ? "xn--" + s(e) : e
                    })
                }

                var h = "object" == typeof exports && exports, v = "object" == typeof module && module && module.exports == h && module, w = "object" == typeof e && e;
                (w.global === w || w.window === w) && (o = w);
                var g, y, x = 2147483647, C = 36, b = 1, j = 26, m = 38, A = 700, I = 72, F = 128, E = "-", O = /^xn--/, S = /[^ -~]/, L = /\x2E|\u3002|\uFF0E|\uFF61/g, M = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, P = C - b, R = Math.floor, T = String.fromCharCode;
                if (g = {
                        version: "1.2.4",
                        ucs2: {decode: f, encode: i},
                        decode: l,
                        encode: s,
                        toASCII: a,
                        toUnicode: p
                    }, "function" == typeof define && "object" == typeof define.amd && define.amd)define("punycode", function () {
                    return g
                }); else if (h && !h.nodeType)if (v)v.exports = g; else for (y in g)g.hasOwnProperty(y) && (h[y] = g[y]); else o.punycode = g
            }(this)
        }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    98: [function (require, module, exports) {
        "use strict";
        function hasOwnProperty(r, e) {
            return Object.prototype.hasOwnProperty.call(r, e)
        }

        module.exports = function (r, e, t, n) {
            e = e || "&", t = t || "=";
            var o = {};
            if ("string" != typeof r || 0 === r.length)return o;
            var a = /\+/g;
            r = r.split(e);
            var s = 1e3;
            n && "number" == typeof n.maxKeys && (s = n.maxKeys);
            var p = r.length;
            s > 0 && p > s && (p = s);
            for (var y = 0; p > y; ++y) {
                var u, c, i, l, f = r[y].replace(a, "%20"), v = f.indexOf(t);
                v >= 0 ? (u = f.substr(0, v), c = f.substr(v + 1)) : (u = f, c = ""), i = decodeURIComponent(u), l = decodeURIComponent(c), hasOwnProperty(o, i) ? isArray(o[i]) ? o[i].push(l) : o[i] = [o[i], l] : o[i] = l
            }
            return o
        };
        var isArray = Array.isArray || function (r) {
                return "[object Array]" === Object.prototype.toString.call(r)
            };
    }, {}],
    99: [function (require, module, exports) {
        "use strict";
        function map(r, e) {
            if (r.map)return r.map(e);
            for (var t = [], n = 0; n < r.length; n++)t.push(e(r[n], n));
            return t
        }

        var stringifyPrimitive = function (r) {
            switch (typeof r) {
                case"string":
                    return r;
                case"boolean":
                    return r ? "true" : "false";
                case"number":
                    return isFinite(r) ? r : "";
                default:
                    return ""
            }
        };
        module.exports = function (r, e, t, n) {
            return e = e || "&", t = t || "=", null === r && (r = void 0), "object" == typeof r ? map(objectKeys(r), function (n) {
                var i = encodeURIComponent(stringifyPrimitive(n)) + t;
                return isArray(r[n]) ? r[n].map(function (r) {
                    return i + encodeURIComponent(stringifyPrimitive(r))
                }).join(e) : i + encodeURIComponent(stringifyPrimitive(r[n]))
            }).join(e) : n ? encodeURIComponent(stringifyPrimitive(n)) + t + encodeURIComponent(stringifyPrimitive(r)) : ""
        };
        var isArray = Array.isArray || function (r) {
                return "[object Array]" === Object.prototype.toString.call(r)
            }, objectKeys = Object.keys || function (r) {
                var e = [];
                for (var t in r)Object.prototype.hasOwnProperty.call(r, t) && e.push(t);
                return e
            };
    }, {}],
    100: [function (require, module, exports) {
        "use strict";
        exports.decode = exports.parse = require("./decode"), exports.encode = exports.stringify = require("./encode");
    }, {"./decode": 98, "./encode": 99}],
    101: [function (require, module, exports) {
        function Duplex(e) {
            return this instanceof Duplex ? (Readable.call(this, e), Writable.call(this, e), e && e.readable === !1 && (this.readable = !1), e && e.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1), void this.once("end", onend)) : new Duplex(e)
        }

        function onend() {
            if (!this.allowHalfOpen && !this._writableState.ended) {
                var e = this;
                setImmediate(function () {
                    e.end()
                })
            }
        }

        module.exports = Duplex;
        var inherits = require("inherits"), setImmediate = require("process/browser.js").nextTick, Readable = require("./readable.js"), Writable = require("./writable.js");
        inherits(Duplex, Readable), Duplex.prototype.write = Writable.prototype.write, Duplex.prototype.end = Writable.prototype.end, Duplex.prototype._write = Writable.prototype._write;
    }, {"./readable.js": 105, "./writable.js": 107, "inherits": 94, "process/browser.js": 103}],
    102: [function (require, module, exports) {
        function Stream() {
            EE.call(this)
        }

        module.exports = Stream;
        var EE = require("events").EventEmitter, inherits = require("inherits");
        inherits(Stream, EE), Stream.Readable = require("./readable.js"), Stream.Writable = require("./writable.js"), Stream.Duplex = require("./duplex.js"), Stream.Transform = require("./transform.js"), Stream.PassThrough = require("./passthrough.js"), Stream.Stream = Stream, Stream.prototype.pipe = function (e, r) {
            function t(r) {
                e.writable && !1 === e.write(r) && m.pause && m.pause()
            }

            function n() {
                m.readable && m.resume && m.resume()
            }

            function o() {
                u || (u = !0, e.end())
            }

            function i() {
                u || (u = !0, "function" == typeof e.destroy && e.destroy())
            }

            function s(e) {
                if (a(), 0 === EE.listenerCount(this, "error"))throw e
            }

            function a() {
                m.removeListener("data", t), e.removeListener("drain", n), m.removeListener("end", o), m.removeListener("close", i), m.removeListener("error", s), e.removeListener("error", s), m.removeListener("end", a), m.removeListener("close", a), e.removeListener("close", a)
            }

            var m = this;
            m.on("data", t), e.on("drain", n), e._isStdio || r && r.end === !1 || (m.on("end", o), m.on("close", i));
            var u = !1;
            return m.on("error", s), e.on("error", s), m.on("end", a), m.on("close", a), e.on("close", a), e.emit("pipe", m), e
        };
    }, {
        "./duplex.js": 101,
        "./passthrough.js": 104,
        "./readable.js": 105,
        "./transform.js": 106,
        "./writable.js": 107,
        "events": "T9Wsc/",
        "inherits": 94
    }],
    103: [function (require, module, exports) {
        var process = module.exports = {};
        process.nextTick = function () {
            var e = "undefined" != typeof window && window.setImmediate, n = "undefined" != typeof window && window.postMessage && window.addEventListener;
            if (e)return function (e) {
                return window.setImmediate(e)
            };
            if (n) {
                var o = [];
                return window.addEventListener("message", function (e) {
                    var n = e.source;
                    if ((n === window || null === n) && "process-tick" === e.data && (e.stopPropagation(), o.length > 0)) {
                        var r = o.shift();
                        r()
                    }
                }, !0), function (e) {
                    o.push(e), window.postMessage("process-tick", "*")
                }
            }
            return function (e) {
                setTimeout(e, 0)
            }
        }(), process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.binding = function () {
            throw new Error("process.binding is not supported")
        }, process.cwd = function () {
            return "/"
        }, process.chdir = function () {
            throw new Error("process.chdir is not supported")
        };
    }, {}],
    104: [function (require, module, exports) {
        function PassThrough(r) {
            return this instanceof PassThrough ? void Transform.call(this, r) : new PassThrough(r)
        }

        module.exports = PassThrough;
        var Transform = require("./transform.js"), inherits = require("inherits");
        inherits(PassThrough, Transform), PassThrough.prototype._transform = function (r, s, o) {
            o(null, r)
        };
    }, {"./transform.js": 106, "inherits": 94}],
    105: [function (require, module, exports) {
        (function (e) {
            function t(e) {
                e = e || {};
                var t = e.highWaterMark;
                this.highWaterMark = t || 0 === t ? t : 16384, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = !1, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.calledRead = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.objectMode = !!e.objectMode, this.defaultEncoding = e.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (_ || (_ = require("string_decoder").StringDecoder), this.decoder = new _(e.encoding), this.encoding = e.encoding)
            }

            function n(e) {
                return this instanceof n ? (this._readableState = new t(e, this), this.readable = !0, void S.call(this)) : new n(e)
            }

            function r(e, t, n, r, a) {
                var o = d(t, n);
                if (o)e.emit("error", o); else if (null === n || void 0 === n)t.reading = !1, t.ended || s(e, t); else if (t.objectMode || n && n.length > 0)if (t.ended && !a) {
                    var u = new Error("stream.push() after EOF");
                    e.emit("error", u)
                } else if (t.endEmitted && a) {
                    var u = new Error("stream.unshift() after end event");
                    e.emit("error", u)
                } else!t.decoder || a || r || (n = t.decoder.write(n)), t.length += t.objectMode ? 1 : n.length, a ? t.buffer.unshift(n) : (t.reading = !1, t.buffer.push(n)), t.needReadable && l(e), h(e, t); else a || (t.reading = !1);
                return i(t)
            }

            function i(e) {
                return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
            }

            function a(e) {
                if (e >= L)e = L; else {
                    e--;
                    for (var t = 1; 32 > t; t <<= 1)e |= e >> t;
                    e++
                }
                return e
            }

            function o(e, t) {
                return 0 === t.length && t.ended ? 0 : t.objectMode ? 0 === e ? 0 : 1 : isNaN(e) || null === e ? t.flowing && t.buffer.length ? t.buffer[0].length : t.length : 0 >= e ? 0 : (e > t.highWaterMark && (t.highWaterMark = a(e)), e > t.length ? t.ended ? t.length : (t.needReadable = !0, 0) : e)
            }

            function d(e, t) {
                var n = null;
                return R.isBuffer(t) || "string" == typeof t || null === t || void 0 === t || e.objectMode || n || (n = new TypeError("Invalid non-string/buffer chunk")), n
            }

            function s(e, t) {
                if (t.decoder && !t.ended) {
                    var n = t.decoder.end();
                    n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length)
                }
                t.ended = !0, t.length > 0 ? l(e) : v(e)
            }

            function l(e) {
                var t = e._readableState;
                t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, t.sync ? E(function () {
                    u(e)
                }) : u(e))
            }

            function u(e) {
                e.emit("readable")
            }

            function h(e, t) {
                t.readingMore || (t.readingMore = !0, E(function () {
                    f(e, t)
                }))
            }

            function f(e, t) {
                for (var n = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (e.read(0), n !== t.length);)n = t.length;
                t.readingMore = !1
            }

            function p(e) {
                return function () {
                    var t = e._readableState;
                    t.awaitDrain--, 0 === t.awaitDrain && c(e)
                }
            }

            function c(e) {
                function t(e) {
                    var t = e.write(n);
                    !1 === t && r.awaitDrain++
                }

                var n, r = e._readableState;
                for (r.awaitDrain = 0; r.pipesCount && null !== (n = e.read());)if (1 === r.pipesCount ? t(r.pipes, 0, null) : w(r.pipes, t), e.emit("data", n), r.awaitDrain > 0)return;
                return 0 === r.pipesCount ? (r.flowing = !1, void(M.listenerCount(e, "data") > 0 && b(e))) : void(r.ranOut = !0)
            }

            function g() {
                this._readableState.ranOut && (this._readableState.ranOut = !1, c(this))
            }

            function b(e, t) {
                var n = e._readableState;
                if (n.flowing)throw new Error("Cannot switch to old mode now.");
                var r = t || !1, i = !1;
                e.readable = !0, e.pipe = S.prototype.pipe, e.on = e.addListener = S.prototype.on, e.on("readable", function () {
                    i = !0;
                    for (var t; !r && null !== (t = e.read());)e.emit("data", t);
                    null === t && (i = !1, e._readableState.needReadable = !0)
                }), e.pause = function () {
                    r = !0, this.emit("pause")
                }, e.resume = function () {
                    r = !1, i ? E(function () {
                        e.emit("readable")
                    }) : this.read(0), this.emit("resume")
                }, e.emit("readable")
            }

            function m(e, t) {
                var n, r = t.buffer, i = t.length, a = !!t.decoder, o = !!t.objectMode;
                if (0 === r.length)return null;
                if (0 === i)n = null; else if (o)n = r.shift(); else if (!e || e >= i)n = a ? r.join("") : R.concat(r, i), r.length = 0; else if (e < r[0].length) {
                    var d = r[0];
                    n = d.slice(0, e), r[0] = d.slice(e)
                } else if (e === r[0].length)n = r.shift(); else {
                    n = a ? "" : new R(e);
                    for (var s = 0, l = 0, u = r.length; u > l && e > s; l++) {
                        var d = r[0], h = Math.min(e - s, d.length);
                        a ? n += d.slice(0, h) : d.copy(n, s, 0, h), h < d.length ? r[0] = d.slice(h) : r.shift(), s += h
                    }
                }
                return n
            }

            function v(e) {
                var t = e._readableState;
                if (t.length > 0)throw new Error("endReadable called on non-empty stream");
                !t.endEmitted && t.calledRead && (t.ended = !0, E(function () {
                    t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"))
                }))
            }

            function w(e, t) {
                for (var n = 0, r = e.length; r > n; n++)t(e[n], n)
            }

            function y(e, t) {
                for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
                return -1
            }

            module.exports = n, n.ReadableState = t;
            var _, M = require("events").EventEmitter, S = require("./index.js"), R = require("buffer").Buffer, E = require("process/browser.js").nextTick, C = require("inherits");
            C(n, S), n.prototype.push = function (e, t) {
                var n = this._readableState;
                return "string" != typeof e || n.objectMode || (t = t || n.defaultEncoding, t !== n.encoding && (e = new R(e, t), t = "")), r(this, n, e, t, !1)
            }, n.prototype.unshift = function (e) {
                var t = this._readableState;
                return r(this, t, e, "", !0)
            }, n.prototype.setEncoding = function (e) {
                _ || (_ = require("string_decoder").StringDecoder), this._readableState.decoder = new _(e), this._readableState.encoding = e
            };
            var L = 8388608;
            n.prototype.read = function (e) {
                var t = this._readableState;
                t.calledRead = !0;
                var n = e;
                if (("number" != typeof e || e > 0) && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended))return l(this), null;
                if (e = o(e, t), 0 === e && t.ended)return 0 === t.length && v(this), null;
                var r = t.needReadable;
                t.length - e <= t.highWaterMark && (r = !0), (t.ended || t.reading) && (r = !1), r && (t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1), r && !t.reading && (e = o(n, t));
                var i;
                return i = e > 0 ? m(e, t) : null, null === i && (t.needReadable = !0, e = 0), t.length -= e, 0 !== t.length || t.ended || (t.needReadable = !0), t.ended && !t.endEmitted && 0 === t.length && v(this), i
            }, n.prototype._read = function () {
                this.emit("error", new Error("not implemented"))
            }, n.prototype.pipe = function (t, n) {
                function r(e) {
                    e === u && a()
                }

                function i() {
                    t.end()
                }

                function a() {
                    t.removeListener("close", d), t.removeListener("finish", s), t.removeListener("drain", m), t.removeListener("error", o), t.removeListener("unpipe", r), u.removeListener("end", i), u.removeListener("end", a), (!t._writableState || t._writableState.needDrain) && m()
                }

                function o(e) {
                    l(), 0 === v && 0 === M.listenerCount(t, "error") && t.emit("error", e)
                }

                function d() {
                    t.removeListener("finish", s), l()
                }

                function s() {
                    t.removeListener("close", d), l()
                }

                function l() {
                    u.unpipe(t)
                }

                var u = this, h = this._readableState;
                switch (h.pipesCount) {
                    case 0:
                        h.pipes = t;
                        break;
                    case 1:
                        h.pipes = [h.pipes, t];
                        break;
                    default:
                        h.pipes.push(t)
                }
                h.pipesCount += 1;
                var f = (!n || n.end !== !1) && t !== e.stdout && t !== e.stderr, b = f ? i : a;
                h.endEmitted ? E(b) : u.once("end", b), t.on("unpipe", r);
                var m = p(u);
                t.on("drain", m);
                var v = M.listenerCount(t, "error");
                return t.once("error", o), t.once("close", d), t.once("finish", s), t.emit("pipe", u), h.flowing || (this.on("readable", g), h.flowing = !0, E(function () {
                    c(u)
                })), t
            }, n.prototype.unpipe = function (e) {
                var t = this._readableState;
                if (0 === t.pipesCount)return this;
                if (1 === t.pipesCount)return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, this.removeListener("readable", g), t.flowing = !1, e && e.emit("unpipe", this), this);
                if (!e) {
                    var n = t.pipes, r = t.pipesCount;
                    t.pipes = null, t.pipesCount = 0, this.removeListener("readable", g), t.flowing = !1;
                    for (var i = 0; r > i; i++)n[i].emit("unpipe", this);
                    return this
                }
                var i = y(t.pipes, e);
                return -1 === i ? this : (t.pipes.splice(i, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this), this)
            }, n.prototype.on = function (e, t) {
                var n = S.prototype.on.call(this, e, t);
                if ("data" !== e || this._readableState.flowing || b(this), "readable" === e && this.readable) {
                    var r = this._readableState;
                    r.readableListening || (r.readableListening = !0, r.emittedReadable = !1, r.needReadable = !0, r.reading ? r.length && l(this, r) : this.read(0))
                }
                return n
            }, n.prototype.addListener = n.prototype.on, n.prototype.resume = function () {
                b(this), this.read(0), this.emit("resume")
            }, n.prototype.pause = function () {
                b(this, !0), this.emit("pause")
            }, n.prototype.wrap = function (e) {
                var t = this._readableState, n = !1, r = this;
                e.on("end", function () {
                    if (t.decoder && !t.ended) {
                        var e = t.decoder.end();
                        e && e.length && r.push(e)
                    }
                    r.push(null)
                }), e.on("data", function (i) {
                    if (t.decoder && (i = t.decoder.write(i)), i && (t.objectMode || i.length)) {
                        var a = r.push(i);
                        a || (n = !0, e.pause())
                    }
                });
                for (var i in e)"function" == typeof e[i] && "undefined" == typeof this[i] && (this[i] = function (t) {
                    return function () {
                        return e[t].apply(e, arguments)
                    }
                }(i));
                var a = ["error", "close", "destroy", "pause", "resume"];
                return w(a, function (t) {
                    e.on(t, function (e) {
                        return r.emit.apply(r, t, e)
                    })
                }), r._read = function () {
                    n && (n = !1, e.resume())
                }, r
            }, n._fromList = m
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"));
    }, {
        "./index.js": 102,
        "/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95,
        "buffer": 78,
        "events": "T9Wsc/",
        "inherits": 94,
        "process/browser.js": 103,
        "string_decoder": 108
    }],
    106: [function (require, module, exports) {
        function TransformState(r, t) {
            this.afterTransform = function (r, n) {
                return afterTransform(t, r, n)
            }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null
        }

        function afterTransform(r, t, n) {
            var e = r._transformState;
            e.transforming = !1;
            var a = e.writecb;
            if (!a)return r.emit("error", new Error("no writecb in Transform class"));
            e.writechunk = null, e.writecb = null, null !== n && void 0 !== n && r.push(n), a && a(t);
            var i = r._readableState;
            i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && r._read(i.highWaterMark)
        }

        function Transform(r) {
            if (!(this instanceof Transform))return new Transform(r);
            Duplex.call(this, r);
            var t = (this._transformState = new TransformState(r, this), this);
            this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("finish", function () {
                "function" == typeof this._flush ? this._flush(function (r) {
                    done(t, r)
                }) : done(t)
            })
        }

        function done(r, t) {
            if (t)return r.emit("error", t);
            var n = r._writableState, e = (r._readableState, r._transformState);
            if (n.length)throw new Error("calling transform done when ws.length != 0");
            if (e.transforming)throw new Error("calling transform done when still transforming");
            return r.push(null)
        }

        module.exports = Transform;
        var Duplex = require("./duplex.js"), inherits = require("inherits");
        inherits(Transform, Duplex), Transform.prototype.push = function (r, t) {
            return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, r, t)
        }, Transform.prototype._transform = function () {
            throw new Error("not implemented")
        }, Transform.prototype._write = function (r, t, n) {
            var e = this._transformState;
            if (e.writecb = n, e.writechunk = r, e.writeencoding = t, !e.transforming) {
                var a = this._readableState;
                (e.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
            }
        }, Transform.prototype._read = function () {
            var r = this._transformState;
            r.writechunk && r.writecb && !r.transforming ? (r.transforming = !0, this._transform(r.writechunk, r.writeencoding, r.afterTransform)) : r.needTransform = !0
        };
    }, {"./duplex.js": 101, "inherits": 94}],
    107: [function (require, module, exports) {
        function WriteReq(e, t, r) {
            this.chunk = e, this.encoding = t, this.callback = r
        }

        function WritableState(e, t) {
            e = e || {};
            var r = e.highWaterMark;
            this.highWaterMark = r || 0 === r ? r : 16384, this.objectMode = !!e.objectMode, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
            var i = e.decodeStrings === !1;
            this.decodeStrings = !i, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
                onwrite(t, e)
            }, this.writecb = null, this.writelen = 0, this.buffer = []
        }

        function Writable(e) {
            return this instanceof Writable || this instanceof Stream.Duplex ? (this._writableState = new WritableState(e, this), this.writable = !0, void Stream.call(this)) : new Writable(e)
        }

        function writeAfterEnd(e, t, r) {
            var i = new Error("write after end");
            e.emit("error", i), setImmediate(function () {
                r(i)
            })
        }

        function validChunk(e, t, r, i) {
            var n = !0;
            if (!Buffer.isBuffer(r) && "string" != typeof r && null !== r && void 0 !== r && !t.objectMode) {
                var f = new TypeError("Invalid non-string/buffer chunk");
                e.emit("error", f), setImmediate(function () {
                    i(f)
                }), n = !1
            }
            return n
        }

        function decodeChunk(e, t, r) {
            return e.objectMode || e.decodeStrings === !1 || "string" != typeof t || (t = new Buffer(t, r)), t
        }

        function writeOrBuffer(e, t, r, i, n) {
            r = decodeChunk(t, r, i);
            var f = t.objectMode ? 1 : r.length;
            t.length += f;
            var o = t.length < t.highWaterMark;
            return t.needDrain = !o, t.writing ? t.buffer.push(new WriteReq(r, i, n)) : doWrite(e, t, f, r, i, n), o
        }

        function doWrite(e, t, r, i, n, f) {
            t.writelen = r, t.writecb = f, t.writing = !0, t.sync = !0, e._write(i, n, t.onwrite), t.sync = !1
        }

        function onwriteError(e, t, r, i, n) {
            r ? setImmediate(function () {
                n(i)
            }) : n(i), e.emit("error", i)
        }

        function onwriteStateUpdate(e) {
            e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
        }

        function onwrite(e, t) {
            var r = e._writableState, i = r.sync, n = r.writecb;
            if (onwriteStateUpdate(r), t)onwriteError(e, r, i, t, n); else {
                var f = needFinish(e, r);
                f || r.bufferProcessing || !r.buffer.length || clearBuffer(e, r), i ? setImmediate(function () {
                    afterWrite(e, r, f, n)
                }) : afterWrite(e, r, f, n)
            }
        }

        function afterWrite(e, t, r, i) {
            r || onwriteDrain(e, t), i(), r && finishMaybe(e, t)
        }

        function onwriteDrain(e, t) {
            0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
        }

        function clearBuffer(e, t) {
            t.bufferProcessing = !0;
            for (var r = 0; r < t.buffer.length; r++) {
                var i = t.buffer[r], n = i.chunk, f = i.encoding, o = i.callback, a = t.objectMode ? 1 : n.length;
                if (doWrite(e, t, a, n, f, o), t.writing) {
                    r++;
                    break
                }
            }
            t.bufferProcessing = !1, r < t.buffer.length ? t.buffer = t.buffer.slice(r) : t.buffer.length = 0
        }

        function needFinish(e, t) {
            return t.ending && 0 === t.length && !t.finished && !t.writing
        }

        function finishMaybe(e, t) {
            var r = needFinish(e, t);
            return r && (t.finished = !0, e.emit("finish")), r
        }

        function endWritable(e, t, r) {
            t.ending = !0, finishMaybe(e, t), r && (t.finished ? setImmediate(r) : e.once("finish", r)), t.ended = !0
        }

        module.exports = Writable, Writable.WritableState = WritableState;
        var isUint8Array = "undefined" != typeof Uint8Array ? function (e) {
            return e instanceof Uint8Array
        } : function (e) {
            return e && e.constructor && "Uint8Array" === e.constructor.name
        }, isArrayBuffer = "undefined" != typeof ArrayBuffer ? function (e) {
            return e instanceof ArrayBuffer
        } : function (e) {
            return e && e.constructor && "ArrayBuffer" === e.constructor.name
        }, inherits = require("inherits"), Stream = require("./index.js"), setImmediate = require("process/browser.js").nextTick, Buffer = require("buffer").Buffer;
        inherits(Writable, Stream), Writable.prototype.pipe = function () {
            this.emit("error", new Error("Cannot pipe. Not readable."))
        }, Writable.prototype.write = function (e, t, r) {
            var i = this._writableState, n = !1;
            return "function" == typeof t && (r = t, t = null), !Buffer.isBuffer(e) && isUint8Array(e) && (e = new Buffer(e)), isArrayBuffer(e) && "undefined" != typeof Uint8Array && (e = new Buffer(new Uint8Array(e))), Buffer.isBuffer(e) ? t = "buffer" : t || (t = i.defaultEncoding), "function" != typeof r && (r = function () {
            }), i.ended ? writeAfterEnd(this, i, r) : validChunk(this, i, e, r) && (n = writeOrBuffer(this, i, e, t, r)), n
        }, Writable.prototype._write = function (e, t, r) {
            r(new Error("not implemented"))
        }, Writable.prototype.end = function (e, t, r) {
            var i = this._writableState;
            "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), "undefined" != typeof e && null !== e && this.write(e, t), i.ending || i.finished || endWritable(this, i, r)
        };
    }, {"./index.js": 102, "buffer": 78, "inherits": 94, "process/browser.js": 103}],
    108: [function (require, module, exports) {
        function assertEncoding(e) {
            if (e && !Buffer.isEncoding(e))throw new Error("Unknown encoding: " + e)
        }

        function passThroughWrite(e) {
            return e.toString(this.encoding)
        }

        function utf16DetectIncompleteChar(e) {
            var t = this.charReceived = e.length % 2;
            return this.charLength = t ? 2 : 0, t
        }

        function base64DetectIncompleteChar(e) {
            var t = this.charReceived = e.length % 3;
            return this.charLength = t ? 3 : 0, t
        }

        var Buffer = require("buffer").Buffer, StringDecoder = exports.StringDecoder = function (e) {
            switch (this.encoding = (e || "utf8").toLowerCase().replace(/[-_]/, ""), assertEncoding(e), this.encoding) {
                case"utf8":
                    this.surrogateSize = 3;
                    break;
                case"ucs2":
                case"utf16le":
                    this.surrogateSize = 2, this.detectIncompleteChar = utf16DetectIncompleteChar;
                    break;
                case"base64":
                    this.surrogateSize = 3, this.detectIncompleteChar = base64DetectIncompleteChar;
                    break;
                default:
                    return void(this.write = passThroughWrite)
            }
            this.charBuffer = new Buffer(6), this.charReceived = 0, this.charLength = 0
        };
        StringDecoder.prototype.write = function (e) {
            for (var t = "", r = 0; this.charLength;) {
                var h = e.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : e.length;
                if (e.copy(this.charBuffer, this.charReceived, r, h), this.charReceived += h - r, r = h, this.charReceived < this.charLength)return "";
                t = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                var i = t.charCodeAt(t.length - 1);
                if (!(i >= 55296 && 56319 >= i)) {
                    if (this.charReceived = this.charLength = 0, h == e.length)return t;
                    e = e.slice(h, e.length);
                    break
                }
                this.charLength += this.surrogateSize, t = ""
            }
            var c = this.detectIncompleteChar(e), n = e.length;
            this.charLength && (e.copy(this.charBuffer, 0, e.length - c, n), this.charReceived = c, n -= c), t += e.toString(this.encoding, 0, n);
            var n = t.length - 1, i = t.charCodeAt(n);
            if (i >= 55296 && 56319 >= i) {
                var a = this.surrogateSize;
                return this.charLength += a, this.charReceived += a, this.charBuffer.copy(this.charBuffer, a, 0, a), this.charBuffer.write(t.charAt(t.length - 1), this.encoding), t.substring(0, n)
            }
            return t
        }, StringDecoder.prototype.detectIncompleteChar = function (e) {
            for (var t = e.length >= 3 ? 3 : e.length; t > 0; t--) {
                var r = e[e.length - t];
                if (1 == t && r >> 5 == 6) {
                    this.charLength = 2;
                    break
                }
                if (2 >= t && r >> 4 == 14) {
                    this.charLength = 3;
                    break
                }
                if (3 >= t && r >> 3 == 30) {
                    this.charLength = 4;
                    break
                }
            }
            return t
        }, StringDecoder.prototype.end = function (e) {
            var t = "";
            if (e && e.length && (t = this.write(e)), this.charReceived) {
                var r = this.charReceived, h = this.charBuffer, i = this.encoding;
                t += h.slice(0, r).toString(i)
            }
            return t
        };
    }, {"buffer": 78}],
    109: [function (require, module, exports) {
        !function () {
            "use strict";
            function t(t, h, a) {
                if (t && "object" == typeof t && t.href)return t;
                if ("string" != typeof t)throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                var n = {}, p = t;
                p = p.trim();
                var i = r.exec(p);
                if (i) {
                    i = i[0];
                    var q = i.toLowerCase();
                    n.protocol = q, p = p.substr(i.length)
                }
                if (a || i || p.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var j = "//" === p.substr(0, 2);
                    !j || i && g[i] || (p = p.substr(2), n.slashes = !0)
                }
                if (!g[i] && (j || i && !y[i])) {
                    var x = p.indexOf("@");
                    if (-1 !== x) {
                        for (var A = p.slice(0, x), O = !0, z = 0, C = m.length; C > z; z++)if (-1 !== A.indexOf(m[z])) {
                            O = !1;
                            break
                        }
                        O && (n.auth = decodeURIComponent(A), p = p.substr(x + 1))
                    }
                    for (var Z = -1, z = 0, C = f.length; C > z; z++) {
                        var k = p.indexOf(f[z]);
                        -1 !== k && (0 > Z || Z > k) && (Z = k)
                    }
                    -1 !== Z ? (n.host = p.substr(0, Z), p = p.substr(Z)) : (n.host = p, p = "");
                    for (var w = s(n.host), I = Object.keys(w), z = 0, C = I.length; C > z; z++) {
                        var R = I[z];
                        n[R] = w[R]
                    }
                    n.hostname = n.hostname || "";
                    var U = "[" === n.hostname[0] && "]" === n.hostname[n.hostname.length - 1];
                    if (n.hostname.length > l)n.hostname = ""; else if (!U)for (var $ = n.hostname.split(/\./), z = 0, C = $.length; C > z; z++) {
                        var _ = $[z];
                        if (_ && !_.match(u)) {
                            for (var L = "", E = 0, P = _.length; P > E; E++)L += _.charCodeAt(E) > 127 ? "x" : _[E];
                            if (!L.match(u)) {
                                var T = $.slice(0, z), B = $.slice(z + 1), D = _.match(v);
                                D && (T.push(D[1]), B.unshift(D[2])), B.length && (p = "/" + B.join(".") + p), n.hostname = T.join(".");
                                break
                            }
                        }
                    }
                    if (n.hostname = n.hostname.toLowerCase(), !U) {
                        for (var F = n.hostname.split("."), G = [], z = 0; z < F.length; ++z) {
                            var H = F[z];
                            G.push(H.match(/[^A-Za-z0-9_-]/) ? "xn--" + o.encode(H) : H)
                        }
                        n.hostname = G.join(".")
                    }
                    n.host = (n.hostname || "") + (n.port ? ":" + n.port : ""), n.href += n.host, U && (n.hostname = n.hostname.substr(1, n.hostname.length - 2), "/" !== p[0] && (p = "/" + p))
                }
                if (!d[q])for (var z = 0, C = c.length; C > z; z++) {
                    var J = c[z], K = encodeURIComponent(J);
                    K === J && (K = escape(J)), p = p.split(J).join(K)
                }
                var M = p.indexOf("#");
                -1 !== M && (n.hash = p.substr(M), p = p.slice(0, M));
                var N = p.indexOf("?");
                return -1 !== N ? (n.search = p.substr(N), n.query = p.substr(N + 1), h && (n.query = b.parse(n.query)), p = p.slice(0, N)) : h && (n.search = "", n.query = {}), p && (n.pathname = p), y[i] && n.hostname && !n.pathname && (n.pathname = "/"), (n.pathname || n.search) && (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = e(n), n
            }

            function e(e) {
                "string" == typeof e && (e = t(e));
                var h = e.auth || "";
                h && (h = encodeURIComponent(h), h = h.replace(/%3A/i, ":"), h += "@");
                var a = e.protocol || "", s = e.pathname || "", o = e.hash || "", r = !1, n = "";
                void 0 !== e.host ? r = h + e.host : void 0 !== e.hostname && (r = h + (-1 === e.hostname.indexOf(":") ? e.hostname : "[" + e.hostname + "]"), e.port && (r += ":" + e.port)), e.query && "object" == typeof e.query && Object.keys(e.query).length && (n = b.stringify(e.query));
                var p = e.search || n && "?" + n || "";
                return a && ":" !== a.substr(-1) && (a += ":"), e.slashes || (!a || y[a]) && r !== !1 ? (r = "//" + (r || ""), s && "/" !== s.charAt(0) && (s = "/" + s)) : r || (r = ""), o && "#" !== o.charAt(0) && (o = "#" + o), p && "?" !== p.charAt(0) && (p = "?" + p), a + r + s + p + o
            }

            function h(t, h) {
                return e(a(t, h))
            }

            function a(h, a) {
                if (!h)return a;
                if (h = t(e(h), !1, !0), a = t(e(a), !1, !0), h.hash = a.hash, "" === a.href)return h.href = e(h), h;
                if (a.slashes && !a.protocol)return a.protocol = h.protocol, y[a.protocol] && a.hostname && !a.pathname && (a.path = a.pathname = "/"), a.href = e(a), a;
                if (a.protocol && a.protocol !== h.protocol) {
                    if (!y[a.protocol])return a.href = e(a), a;
                    if (h.protocol = a.protocol, !a.host && !g[a.protocol]) {
                        for (var s = (a.pathname || "").split("/"); s.length && !(a.host = s.shift()););
                        a.host || (a.host = ""), a.hostname || (a.hostname = ""), "" !== s[0] && s.unshift(""), s.length < 2 && s.unshift(""), a.pathname = s.join("/")
                    }
                    return h.pathname = a.pathname, h.search = a.search, h.query = a.query, h.host = a.host || "", h.auth = a.auth, h.hostname = a.hostname || a.host, h.port = a.port, (void 0 !== h.pathname || void 0 !== h.search) && (h.path = (h.pathname ? h.pathname : "") + (h.search ? h.search : "")), h.slashes = h.slashes || a.slashes, h.href = e(h), h
                }
                var o = h.pathname && "/" === h.pathname.charAt(0), r = void 0 !== a.host || a.pathname && "/" === a.pathname.charAt(0), n = r || o || h.host && a.pathname, p = n, i = h.pathname && h.pathname.split("/") || [], s = a.pathname && a.pathname.split("/") || [], c = h.protocol && !y[h.protocol];
                if (c && (delete h.hostname, delete h.port, h.host && ("" === i[0] ? i[0] = h.host : i.unshift(h.host)), delete h.host, a.protocol && (delete a.hostname, delete a.port, a.host && ("" === s[0] ? s[0] = a.host : s.unshift(a.host)), delete a.host), n = n && ("" === s[0] || "" === i[0])), r)h.host = a.host || "" === a.host ? a.host : h.host, h.hostname = a.hostname || "" === a.hostname ? a.hostname : h.hostname, h.search = a.search, h.query = a.query, i = s; else if (s.length)i || (i = []), i.pop(), i = i.concat(s), h.search = a.search, h.query = a.query; else if ("search"in a) {
                    if (c) {
                        h.hostname = h.host = i.shift();
                        var f = h.host && h.host.indexOf("@") > 0 ? h.host.split("@") : !1;
                        f && (h.auth = f.shift(), h.host = h.hostname = f.shift())
                    }
                    return h.search = a.search, h.query = a.query, (void 0 !== h.pathname || void 0 !== h.search) && (h.path = (h.pathname ? h.pathname : "") + (h.search ? h.search : "")), h.href = e(h), h
                }
                if (!i.length)return delete h.pathname, h.search ? delete h.path : h.path = "/" + h.search, h.href = e(h), h;
                for (var m = i.slice(-1)[0], l = (h.host || a.host) && ("." === m || ".." === m) || "" === m, u = 0, v = i.length; v >= 0; v--)m = i[v], "." == m ? i.splice(v, 1) : ".." === m ? (i.splice(v, 1), u++) : u && (i.splice(v, 1), u--);
                if (!n && !p)for (; u--; u)i.unshift("..");
                !n || "" === i[0] || i[0] && "/" === i[0].charAt(0) || i.unshift(""), l && "/" !== i.join("/").substr(-1) && i.push("");
                var d = "" === i[0] || i[0] && "/" === i[0].charAt(0);
                if (c) {
                    h.hostname = h.host = d ? "" : i.length ? i.shift() : "";
                    var f = h.host && h.host.indexOf("@") > 0 ? h.host.split("@") : !1;
                    f && (h.auth = f.shift(), h.host = h.hostname = f.shift())
                }
                return n = n || h.host && i.length, n && !d && i.unshift(""), h.pathname = i.join("/"), (void 0 !== h.pathname || void 0 !== h.search) && (h.path = (h.pathname ? h.pathname : "") + (h.search ? h.search : "")), h.auth = a.auth || h.auth, h.slashes = h.slashes || a.slashes, h.href = e(h), h
            }

            function s(t) {
                var e = {}, h = n.exec(t);
                return h && (h = h[0], ":" !== h && (e.port = h.substr(1)), t = t.substr(0, t.length - h.length)), t && (e.hostname = t), e
            }

            var o = require("punycode");
            exports.parse = t, exports.resolve = h, exports.resolveObject = a, exports.format = e;
            var r = /^([a-z0-9.+-]+:)/i, n = /:[0-9]*$/, p = ["<", ">", '"', "`", " ", "\r", "\n", "	"], i = ["{", "}", "|", "\\", "^", "~", "`"].concat(p), c = ["'"].concat(p), f = ["%", "/", "?", ";", "#"].concat(i).concat(c), m = ["/", "@", "?", "#"].concat(p), l = 255, u = /^[a-zA-Z0-9][a-z0-9A-Z_-]{0,62}$/, v = /^([a-zA-Z0-9][a-z0-9A-Z_-]{0,62})(.*)$/, d = {
                javascript: !0,
                "javascript:": !0
            }, g = {javascript: !0, "javascript:": !0}, y = {
                http: !0,
                https: !0,
                ftp: !0,
                gopher: !0,
                file: !0,
                "http:": !0,
                "https:": !0,
                "ftp:": !0,
                "gopher:": !0,
                "file:": !0
            }, b = require("querystring")
        }();
    }, {"punycode": 97, "querystring": 100}],
    110: [function (require, module, exports) {
        module.exports = require(76)
    }, {}],
    111: [function (require, module, exports) {
        module.exports = require(77)
    }, {
        "./support/isBuffer": 110,
        "/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95,
        "inherits": 94
    }],
    "bufferput": [function (require, module, exports) {
        module.exports = require('aXRuS6');
    }, {}],
    "aXRuS6": [function (require, module, exports) {
        (function (t) {
            function e() {
                this.words = [], this.len = 0
            }

            module.exports = e, e.prototype.put = function (t) {
                return this.words.push({buffer: t}), this.len += t.length, this
            }, e.prototype.word8 = function (t) {
                return this.words.push({bytes: 1, value: t}), this.len += 1, this
            }, e.prototype.floatle = function (t) {
                return this.words.push({bytes: "float", endian: "little", value: t}), this.len += 4, this
            }, e.prototype.varint = function (t) {
                253 > t ? this.word8(t) : 65536 >= t ? (this.word8(253), this.word16le(t)) : 1 >= t ? (this.word8(254), this.word32le(t)) : (this.word8(255), this.word64le(t))
            }, [8, 16, 24, 32, 64].forEach(function (t) {
                e.prototype["word" + t + "be"] = function (e) {
                    return this.words.push({endian: "big", bytes: t / 8, value: e}), this.len += t / 8, this
                }, e.prototype["word" + t + "le"] = function (e) {
                    return this.words.push({endian: "little", bytes: t / 8, value: e}), this.len += t / 8, this
                }
            }), e.prototype.pad = function (t) {
                return this.words.push({endian: "big", bytes: t, value: 0}), this.len += t, this
            }, e.prototype.length = function () {
                return this.len
            }, e.prototype.buffer = function () {
                var e = new t(this.len), o = 0;
                return this.words.forEach(function (t) {
                    if (t.buffer)t.buffer.copy(e, o, 0), o += t.buffer.length; else if ("float" == t.bytes) {
                        var r = Math.abs(t.value), i = 1 * (t.value >= 0), n = Math.ceil(Math.log(r) / Math.LN2), s = r / (1 << n);
                        e[o++] = i << 7 & ~~(n / 2), e[o++] = (1 & n) << 7 & ~~(s / 65536), e[o++] = 0, e[o++] = 0, o += 4
                    } else for (var h = "big" === t.endian, u = h ? [8 * (t.bytes - 1), -8] : [0, 8], l = u[0]; h ? l >= 0 : l < 8 * t.bytes; l += u[1])e[o++] = l >= 32 ? 255 & Math.floor(t.value / Math.pow(2, l)) : t.value >> l & 255
                }), e
            }, e.prototype.write = function (t) {
                t.write(this.buffer())
            }
        }).call(this, require("buffer").Buffer);
    }, {"buffer": 78}],
    "buffers": [function (require, module, exports) {
        module.exports = require('OBo3aV');
    }, {}],
    "OBo3aV": [function (require, module, exports) {
        (function (t) {
            function e(t) {
                return this instanceof e ? (this.buffers = t || [], void(this.length = this.buffers.reduce(function (t, e) {
                    return t + e.length
                }, 0))) : new e(t)
            }

            module.exports = e, e.prototype.push = function () {
                for (var e = 0; e < arguments.length; e++)if (!t.isBuffer(arguments[e]))throw new TypeError("Tried to push a non-buffer");
                for (var e = 0; e < arguments.length; e++) {
                    var r = arguments[e];
                    this.buffers.push(r), this.length += r.length
                }
                return this.length
            }, e.prototype.unshift = function () {
                for (var e = 0; e < arguments.length; e++)if (!t.isBuffer(arguments[e]))throw new TypeError("Tried to unshift a non-buffer");
                for (var e = 0; e < arguments.length; e++) {
                    var r = arguments[e];
                    this.buffers.unshift(r), this.length += r.length
                }
                return this.length
            }, e.prototype.copy = function (t, e, r, n) {
                return this.slice(r, n).copy(t, e, 0, n - r)
            }, e.prototype.splice = function (r, n) {
                var s = this.buffers, i = r >= 0 ? r : this.length - r, h = [].slice.call(arguments, 2);
                void 0 === n ? n = this.length - i : n > this.length - i && (n = this.length - i);
                for (var r = 0; r < h.length; r++)this.length += h[r].length;
                for (var f = new e, o = 0, l = 0; l < s.length && o + s[l].length < i; l++)o += s[l].length;
                if (i - o > 0) {
                    var u = i - o;
                    if (u + n < s[l].length) {
                        f.push(s[l].slice(u, u + n));
                        for (var g = s[l], p = new t(u), r = 0; u > r; r++)p[r] = g[r];
                        for (var a = new t(g.length - u - n), r = u + n; r < g.length; r++)a[r - n - u] = g[r];
                        if (h.length > 0) {
                            var c = h.slice();
                            c.unshift(p), c.push(a), s.splice.apply(s, [l, 1].concat(c)), l += c.length, h = []
                        } else s.splice(l, 1, p, a), l += 2
                    } else f.push(s[l].slice(u)), s[l] = s[l].slice(0, u), l++
                }
                for (h.length > 0 && (s.splice.apply(s, [l, 0].concat(h)), l += h.length); f.length < n;) {
                    var v = s[l], b = v.length, y = Math.min(b, n - f.length);
                    y === b ? (f.push(v), s.splice(l, 1)) : (f.push(v.slice(0, y)), s[l] = s[l].slice(y))
                }
                return this.length -= f.length, f
            }, e.prototype.slice = function (e, r) {
                var n = this.buffers;
                void 0 === r && (r = this.length), void 0 === e && (e = 0), r > this.length && (r = this.length);
                for (var s = 0, i = 0; i < n.length && s + n[i].length <= e; i++)s += n[i].length;
                for (var h = new t(r - e), f = 0, o = i; r - e > f && o < n.length; o++) {
                    var l = n[o].length, u = 0 === f ? e - s : 0, g = f + l >= r - e ? Math.min(u + (r - e) - f, l) : l;
                    n[o].copy(h, f, u, g), f += g - u
                }
                return h
            }, e.prototype.pos = function (t) {
                if (0 > t || t >= this.length)throw new Error("oob");
                for (var e = t, r = 0, n = null; ;) {
                    if (n = this.buffers[r], e < n.length)return {buf: r, offset: e};
                    e -= n.length, r++
                }
            }, e.prototype.get = function (t) {
                var e = this.pos(t);
                return this.buffers[e.buf].get(e.offset)
            }, e.prototype.set = function (t, e) {
                var r = this.pos(t);
                return this.buffers[r.buf].set(r.offset, e)
            }, e.prototype.indexOf = function (e, r) {
                if ("string" == typeof e)e = new t(e); else if (!(e instanceof t))throw new Error("Invalid type for a search string");
                if (!e.length)return 0;
                if (!this.length)return -1;
                var n, s = 0, i = 0, h = 0, f = 0;
                if (r) {
                    var o = this.pos(r);
                    s = o.buf, i = o.offset, f = r
                }
                for (; ;) {
                    for (; i >= this.buffers[s].length;)if (i = 0, s++, s >= this.buffers.length)return -1;
                    var l = this.buffers[s][i];
                    if (l == e[h]) {
                        if (0 == h && (n = {i: s, j: i, pos: f}), h++, h == e.length)return n.pos
                    } else 0 != h && (s = n.i, i = n.j, f = n.pos, h = 0);
                    i++, f++
                }
            }, e.prototype.toBuffer = function () {
                return this.slice()
            }, e.prototype.toString = function (t, e, r) {
                return this.slice(e, r).toString(t)
            }
        }).call(this, require("buffer").Buffer);
    }, {"buffer": 78}],
    116: [function (require, module, exports) {
        var elliptic = exports;
        elliptic.version = require("../package.json").version, elliptic.utils = require("./elliptic/utils"), elliptic.rand = require("./elliptic/rand"), elliptic.hmacDRBG = require("./elliptic/hmac-drbg"), elliptic.curve = require("./elliptic/curve"), elliptic.curves = require("./elliptic/curves"), elliptic.ec = require("./elliptic/ec");
    }, {
        "../package.json": 137,
        "./elliptic/curve": 119,
        "./elliptic/curves": 122,
        "./elliptic/ec": 123,
        "./elliptic/hmac-drbg": 126,
        "./elliptic/rand": 127,
        "./elliptic/utils": 128
    }],
    117: [function (require, module, exports) {
        function BaseCurve(t, e) {
            this.type = t, this.p = new bn(e.p, 16), this.red = e.prime ? bn.red(e.prime) : bn.mont(this.p), this.zero = new bn(0).toRed(this.red), this.one = new bn(1).toRed(this.red), this.two = new bn(2).toRed(this.red), this.n = e.n && new bn(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4)
        }

        function BasePoint(t, e) {
            this.curve = t, this.type = e, this.precomputed = null
        }

        var assert = require("assert"), bn = require("bn.js"), elliptic = require("../../elliptic"), getNAF = elliptic.utils.getNAF, getJSF = elliptic.utils.getJSF;
        module.exports = BaseCurve, BaseCurve.prototype.point = function () {
            throw new Error("Not implemented")
        }, BaseCurve.prototype.validate = function () {
            throw new Error("Not implemented")
        }, BaseCurve.prototype._fixedNafMul = function (t, e) {
            var n = t._getDoubles(), r = getNAF(e, 1), i = (1 << n.step + 1) - (n.step % 2 === 0 ? 2 : 1);
            i /= 3;
            for (var o = [], s = 0; s < r.length; s += n.step) {
                for (var a = 0, e = s + n.step - 1; e >= s; e--)a = (a << 1) + r[e];
                o.push(a)
            }
            for (var u = this.jpoint(null, null, null), p = this.jpoint(null, null, null), l = i; l > 0; l--) {
                for (var s = 0; s < o.length; s++) {
                    var a = o[s];
                    a === l ? p = p.mixedAdd(n.points[s]) : a === -l && (p = p.mixedAdd(n.points[s].neg()))
                }
                u = u.add(p)
            }
            return u.toP()
        }, BaseCurve.prototype._wnafMul = function (t, e) {
            var n = 4, r = t._getNAFPoints(n);
            n = r.wnd;
            for (var i = r.points, o = getNAF(e, n), s = this.jpoint(null, null, null), a = o.length - 1; a >= 0; a--) {
                for (var e = 0; a >= 0 && 0 === o[a]; a--)e++;
                if (a >= 0 && e++, s = s.dblp(e), 0 > a)break;
                var u = o[a];
                assert(0 !== u), s = "affine" === t.type ? s.mixedAdd(u > 0 ? i[u - 1 >> 1] : i[-u - 1 >> 1].neg()) : s.add(u > 0 ? i[u - 1 >> 1] : i[-u - 1 >> 1].neg())
            }
            return "affine" === t.type ? s.toP() : s
        }, BaseCurve.prototype._wnafMulAdd = function (t, e, n, r) {
            for (var i = this._wnafT1, o = this._wnafT2, s = this._wnafT3, a = 0, u = 0; r > u; u++) {
                var p = e[u], l = p._getNAFPoints(t);
                i[u] = l.wnd, o[u] = l.points
            }
            for (var u = r - 1; u >= 1; u -= 2) {
                var d = u - 1, h = u;
                if (1 === i[d] && 1 === i[h]) {
                    var f = [e[d], null, null, e[h]];
                    0 === e[d].y.cmp(e[h].y) ? (f[1] = e[d].add(e[h]), f[2] = e[d].toJ().mixedAdd(e[h].neg())) : 0 === e[d].y.cmp(e[h].y.redNeg()) ? (f[1] = e[d].toJ().mixedAdd(e[h]), f[2] = e[d].add(e[h].neg())) : (f[1] = e[d].toJ().mixedAdd(e[h]), f[2] = e[d].toJ().mixedAdd(e[h].neg()));
                    var v = [-3, -1, -5, -7, 0, 7, 5, 1, 3], g = getJSF(n[d], n[h]);
                    a = Math.max(g[0].length, a), s[d] = new Array(a), s[h] = new Array(a);
                    for (var m = 0; a > m; m++) {
                        var c = 0 | g[0][m], w = 0 | g[1][m];
                        s[d][m] = v[3 * (c + 1) + (w + 1)], s[h][m] = 0, o[d] = f
                    }
                } else s[d] = getNAF(n[d], i[d]), s[h] = getNAF(n[h], i[h]), a = Math.max(s[d].length, a), a = Math.max(s[h].length, a)
            }
            for (var b = this.jpoint(null, null, null), y = this._wnafT4, u = a; u >= 0; u--) {
                for (var A = 0; u >= 0;) {
                    for (var _ = !0, m = 0; r > m; m++)y[m] = 0 | s[m][u], 0 !== y[m] && (_ = !1);
                    if (!_)break;
                    A++, u--
                }
                if (u >= 0 && A++, b = b.dblp(A), 0 > u)break;
                for (var m = 0; r > m; m++) {
                    var p, B = y[m];
                    0 !== B && (B > 0 ? p = o[m][B - 1 >> 1] : 0 > B && (p = o[m][-B - 1 >> 1].neg()), b = "affine" === p.type ? b.mixedAdd(p) : b.add(p))
                }
            }
            for (var u = 0; r > u; u++)o[u] = null;
            return b.toP()
        }, BaseCurve.BasePoint = BasePoint, BasePoint.prototype.validate = function () {
            return this.curve.validate(this)
        }, BasePoint.prototype.precompute = function (t) {
            if (this.precomputed)return this;
            var e = {doubles: null, naf: null, beta: null};
            return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this
        }, BasePoint.prototype._getDoubles = function (t, e) {
            if (this.precomputed && this.precomputed.doubles)return this.precomputed.doubles;
            for (var n = [this], r = this, i = 0; e > i; i += t) {
                for (var o = 0; t > o; o++)r = r.dbl();
                n.push(r)
            }
            return {step: t, points: n}
        }, BasePoint.prototype._getNAFPoints = function (t) {
            if (this.precomputed && this.precomputed.naf)return this.precomputed.naf;
            for (var e = [this], n = (1 << t) - 1, r = 1 === n ? null : this.dbl(), i = 1; n > i; i++)e[i] = e[i - 1].add(r);
            return {wnd: t, points: e}
        }, BasePoint.prototype._getBeta = function () {
            return null
        }, BasePoint.prototype.dblp = function (t) {
            for (var e = this, n = 0; t > n; n++)e = e.dbl();
            return e
        };
    }, {"../../elliptic": 116, "assert": 75, "bn.js": 129}],
    118: [function (require, module, exports) {
        function EdwardsCurve(t) {
            this.twisted = 1 != t.a, this.mOneA = this.twisted && -1 == t.a, this.extended = this.mOneA, Base.call(this, "mont", t), this.a = new bn(t.a, 16).mod(this.red.m).toRed(this.red), this.c = new bn(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new bn(t.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), assert(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == t.c
        }

        function Point(t, e, r, i, d) {
            Base.BasePoint.call(this, t, "projective"), null === e && null === r && null === i ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new bn(e, 16), this.y = new bn(r, 16), this.z = i ? new bn(i, 16) : this.curve.one, this.t = d && new bn(d, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
        }

        var assert = require("assert"), curve = require("../curve"), elliptic = require("../../elliptic"), bn = require("bn.js"), inherits = require("inherits"), Base = curve.base, getNAF = elliptic.utils.getNAF;
        inherits(EdwardsCurve, Base), module.exports = EdwardsCurve, EdwardsCurve.prototype._mulA = function (t) {
            return this.mOneA ? t.redNeg() : this.a.redMul(t)
        }, EdwardsCurve.prototype._mulC = function (t) {
            return this.oneC ? t : this.c.redMul(t)
        }, EdwardsCurve.prototype.point = function (t, e, r, i) {
            return new Point(this, t, e, r, i)
        }, EdwardsCurve.prototype.jpoint = function (t, e, r, i) {
            return this.point(t, e, r, i)
        }, EdwardsCurve.prototype.pointFromJSON = function (t) {
            return Point.fromJSON(this, t)
        }, EdwardsCurve.prototype.pointFromX = function (t, e) {
            e = new bn(e, 16), e.red || (e = e.toRed(this.red));
            var r = e.redSqr(), i = this.c2.redSub(this.a.redMul(r)), d = this.one.redSub(this.c2.redMul(this.d).redMul(r)), s = i.redMul(d.redInvm()).redSqrt(), u = s.fromRed().isOdd();
            return (t && !u || !t && u) && (s = s.redNeg()), this.point(e, s, curve.one)
        }, EdwardsCurve.prototype.validate = function (t) {
            if (t.isInfinity())return !0;
            t.normalize();
            var e = t.x.redSqr(), r = t.y.redSqr(), i = e.redMul(this.a).redAdd(r), d = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));
            return 0 === i.cmp(d)
        }, inherits(Point, Base.BasePoint), Point.fromJSON = function (t, e) {
            return new Point(t, e[0], e[1], e[2])
        }, Point.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16) + " y: " + this.y.fromRed().toString(16) + " z: " + this.z.fromRed().toString(16) + ">"
        }, Point.prototype.isInfinity = function () {
            return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z)
        }, Point.prototype._extDbl = function () {
            var t = this.x.redSqr(), e = this.y.redSqr(), r = this.z.redSqr();
            r = r.redIAdd(r);
            var i = this.curve._mulA(t), d = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e), s = i.redAdd(e), u = s.redSub(r), n = i.redSub(e), h = d.redMul(u), o = s.redMul(n), l = d.redMul(n), c = u.redMul(s);
            return this.curve.point(h, o, c, l)
        }, Point.prototype._projDbl = function () {
            var t = this.x.redAdd(this.y).redSqr(), e = this.x.redSqr(), r = this.y.redSqr();
            if (this.curve.twisted) {
                var i = this.curve._mulA(e), d = i.redAdd(r);
                if (this.zOne)var s = t.redSub(e).redSub(r).redMul(d.redSub(this.curve.two)), u = d.redMul(i.redSub(r)), n = d.redSqr().redSub(d).redSub(d); else var h = this.z.redSqr(), o = d.redSub(h).redISub(h), s = t.redSub(e).redISub(r).redMul(o), u = d.redMul(i.redSub(r)), n = d.redMul(o)
            } else var i = e.redAdd(r), h = this.curve._mulC(redMul(this.z)).redSqr(), o = i.redSub(h).redSub(h), s = this.curve._mulC(t.redISub(i)).redMul(o), u = this.curve._mulC(i).redMul(e.redISub(r)), n = i.redMul(o);
            return this.curve.point(s, u, n)
        }, Point.prototype.dbl = function () {
            return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
        }, Point.prototype._extAdd = function (t) {
            var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)), r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)), i = this.t.redMul(this.curve.dd).redMul(t.t), d = this.z.redMul(t.z.redAdd(t.z)), s = r.redSub(e), u = d.redSub(i), n = d.redAdd(i), h = r.redAdd(e), o = s.redMul(u), l = n.redMul(h), c = s.redMul(h), p = u.redMul(n);
            return this.curve.point(o, l, p, c)
        }, Point.prototype._projAdd = function (t) {
            var e = this.z.redMul(t.z), r = e.redSqr(), i = this.x.redMul(t.x), d = this.y.redMul(t.y), s = this.curve.d.redMul(i).redMul(d), u = r.redSub(s), n = r.redAdd(s), h = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(i).redISub(d), o = e.redMul(u).redMul(h);
            if (this.curve.twisted)var l = e.redMul(n).redMul(d.redSub(this.curve._mulA(i))), c = u.redMul(n); else var l = e.redMul(n).redMul(d.redSub(i)), c = this.curve._mulC(u).redMul(n);
            return this.curve.point(o, l, c)
        }, Point.prototype.add = function (t) {
            return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
        }, Point.prototype.mul = function (t) {
            return this.precomputed && this.precomputed.doubles ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
        }, Point.prototype.mulAdd = function (t, e, r) {
            return this.curve._wnafMulAdd(1, [this, e], [t, r], 2)
        }, Point.prototype.normalize = function () {
            if (this.zOne)return this;
            var t = this.z.redInvm();
            return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)), this.z = this.curve.one, this.zOne = !0, this
        }, Point.prototype.neg = function () {
            return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
        }, Point.prototype.getX = function () {
            return this.normalize(), this.x.fromRed()
        }, Point.prototype.getY = function () {
            return this.normalize(), this.y.fromRed()
        }, Point.prototype.toP = Point.prototype.normalize, Point.prototype.mixedAdd = Point.prototype.add;
    }, {"../../elliptic": 116, "../curve": 119, "assert": 75, "bn.js": 129, "inherits": 136}],
    119: [function (require, module, exports) {
        var curve = exports;
        curve.base = require("./base"), curve.short = require("./short"), curve.mont = require("./mont"), curve.edwards = require("./edwards");
    }, {"./base": 117, "./edwards": 118, "./mont": 120, "./short": 121}],
    120: [function (require, module, exports) {
        function MontCurve(t) {
            Base.call(this, "mont", t), this.a = new bn(t.a, 16).toRed(this.red), this.b = new bn(t.b, 16).toRed(this.red), this.i4 = new bn(4).toRed(this.red).redInvm(), this.two = new bn(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
        }

        function Point(t, e, r) {
            Base.BasePoint.call(this, t, "projective"), null === e && null === r ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new bn(e, 16), this.z = new bn(r, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
        }

        var assert = require("assert"), curve = require("../curve"), elliptic = require("../../elliptic"), bn = require("bn.js"), inherits = require("inherits"), Base = curve.base, getNAF = elliptic.utils.getNAF;
        inherits(MontCurve, Base), module.exports = MontCurve, MontCurve.prototype.point = function (t, e) {
            return new Point(this, t, e)
        }, MontCurve.prototype.pointFromJSON = function (t) {
            return Point.fromJSON(this, t)
        }, MontCurve.prototype.validate = function (t) {
            var e = t.normalize().x, r = e.redSqr(), i = r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e), n = i.redSqrt();
            return 0 === n.redSqr().cmp(i)
        }, inherits(Point, Base.BasePoint), Point.prototype.precompute = function () {
        }, Point.fromJSON = function (t, e) {
            return new Point(t, e[0], e[1] || t.one)
        }, Point.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16) + " z: " + this.z.fromRed().toString(16) + ">"
        }, Point.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0)
        }, Point.prototype.dbl = function () {
            var t = this.x.redAdd(this.z), e = t.redSqr(), r = this.x.redSub(this.z), i = r.redSqr(), n = e.redSub(i), o = e.redMul(i), d = n.redMul(i.redAdd(this.curve.a24.redMul(n)));
            return this.curve.point(o, d)
        }, Point.prototype.add = function () {
            throw new Error("Not supported on Montgomery curve")
        }, Point.prototype.diffAdd = function (t, e) {
            var r = this.x.redAdd(this.z), i = this.x.redSub(this.z), n = t.x.redAdd(t.z), o = t.x.redSub(t.z), d = o.redMul(r), s = n.redMul(i), u = e.z.redMul(d.redAdd(s).redSqr()), h = e.x.redMul(d.redISub(s).redSqr());
            return this.curve.point(u, h)
        }, Point.prototype.mul = function (t) {
            for (var e = t.clone(), r = this, i = this.curve.point(null, null), n = this, o = []; 0 !== e.cmpn(0); e.ishrn(1))o.push(e.andln(1));
            for (var d = o.length - 1; d >= 0; d--)0 === o[d] ? (r = r.diffAdd(i, n), i = i.dbl()) : (i = r.diffAdd(i, n), r = r.dbl());
            return i
        }, Point.prototype.mulAdd = function () {
            throw new Error("Not supported on Montgomery curve")
        }, Point.prototype.normalize = function () {
            return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
        }, Point.prototype.getX = function () {
            return this.normalize(), this.x.fromRed()
        };
    }, {"../../elliptic": 116, "../curve": 119, "assert": 75, "bn.js": 129, "inherits": 136}],
    121: [function (require, module, exports) {
        function ShortCurve(r) {
            Base.call(this, "short", r), this.a = new bn(r.a, 16).toRed(this.red), this.b = new bn(r.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(r), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
        }

        function Point(r, e, t, d) {
            Base.BasePoint.call(this, r, "affine"), null === e && null === t ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new bn(e, 16), this.y = new bn(t, 16), d && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
        }

        function JPoint(r, e, t, d) {
            Base.BasePoint.call(this, r, "jacobian"), null === e && null === t && null === d ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new bn(0)) : (this.x = new bn(e, 16), this.y = new bn(t, 16), this.z = new bn(d, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
        }

        var assert = require("assert"), curve = require("../curve"), elliptic = require("../../elliptic"), bn = require("bn.js"), inherits = require("inherits"), Base = curve.base, getNAF = elliptic.utils.getNAF;
        inherits(ShortCurve, Base), module.exports = ShortCurve, ShortCurve.prototype._getEndomorphism = function (r) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                var e, t;
                if (r.beta)e = new bn(r.beta, 16).toRed(this.red); else {
                    var d = this._getEndoRoots(this.p);
                    e = d[0].cmp(d[1]) < 0 ? d[0] : d[1], e = e.toRed(this.red)
                }
                if (r.lambda)t = new bn(r.lambda, 16); else {
                    var i = this._getEndoRoots(this.n);
                    0 === this.g.mul(i[0]).x.cmp(this.g.x.redMul(e)) ? t = i[0] : (t = i[1], assert(0 === this.g.mul(t).x.cmp(this.g.x.redMul(e))))
                }
                var n;
                return n = r.basis ? r.basis.map(function (r) {
                    return {a: new bn(r.a, 16), b: new bn(r.b, 16)}
                }) : this._getEndoBasis(t), {beta: e, lambda: t, basis: n}
            }
        }, ShortCurve.prototype._getEndoRoots = function (r) {
            var e = r === this.p ? this.red : bn.mont(r), t = new bn(2).toRed(e).redInvm(), d = t.redNeg(), i = (new bn(1).toRed(e), new bn(3).toRed(e).redNeg().redSqrt().redMul(t)), n = d.redAdd(i).fromRed(), u = d.redSub(i).fromRed();
            return [n, u]
        }, ShortCurve.prototype._getEndoBasis = function (r) {
            for (var e, t, d, i, n, u, s, o = this.n.shrn(Math.floor(this.n.bitLength() / 2)), h = r, p = this.n.clone(), l = new bn(1), a = new bn(0), b = new bn(0), f = new bn(1), c = 0; 0 !== h.cmpn(0);) {
                var S = p.div(h), v = p.sub(S.mul(h)), I = b.sub(S.mul(l)), y = f.sub(S.mul(a));
                if (!d && v.cmp(o) < 0)e = s.neg(), t = l, d = v.neg(), i = I; else if (d && 2 === ++c)break;
                s = v, p = h, h = v, b = l, l = I, f = a, a = y
            }
            n = v.neg(), u = I;
            var A = d.sqr().add(i.sqr()), m = n.sqr().add(u.sqr());
            return m.cmp(A) >= 0 && (n = e, u = t), d.sign && (d = d.neg(), i = i.neg()), n.sign && (n = n.neg(), u = u.neg()), [{
                a: d,
                b: i
            }, {a: n, b: u}]
        }, ShortCurve.prototype._endoSplit = function (r) {
            var e = this.endo.basis, t = e[0], d = e[1], i = d.b.mul(r).divRound(this.n), n = t.b.neg().mul(r).divRound(this.n), u = i.mul(t.a), s = n.mul(d.a), o = i.mul(t.b), h = n.mul(d.b), p = r.sub(u).sub(s), l = o.add(h).neg();
            return {k1: p, k2: l}
        }, ShortCurve.prototype.point = function (r, e, t) {
            return new Point(this, r, e, t)
        }, ShortCurve.prototype.pointFromX = function (r, e) {
            e = new bn(e, 16), e.red || (e = e.toRed(this.red));
            var t = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), d = t.redSqrt(), i = d.fromRed().isOdd();
            return (r && !i || !r && i) && (d = d.redNeg()), this.point(e, d)
        }, ShortCurve.prototype.jpoint = function (r, e, t) {
            return new JPoint(this, r, e, t)
        }, ShortCurve.prototype.pointFromJSON = function (r, e) {
            return Point.fromJSON(this, r, e)
        }, ShortCurve.prototype.validate = function (r) {
            if (r.inf)return !0;
            var e = r.x, t = r.y, d = this.a.redMul(e), i = e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);
            return 0 === t.redSqr().redISub(i).cmpn(0)
        }, ShortCurve.prototype._endoWnafMulAdd = function (r, e) {
            for (var t = this._endoWnafT1, d = this._endoWnafT2, i = 0; i < r.length; i++) {
                var n = this._endoSplit(e[i]), u = r[i], s = u._getBeta();
                n.k1.sign && (n.k1.sign = !n.k1.sign, u = u.neg(!0)), n.k2.sign && (n.k2.sign = !n.k2.sign, s = s.neg(!0)), t[2 * i] = u, t[2 * i + 1] = s, d[2 * i] = n.k1, d[2 * i + 1] = n.k2
            }
            for (var o = this._wnafMulAdd(1, t, d, 2 * i), h = 0; 2 * i > h; h++)t[h] = null, d[h] = null;
            return o
        }, inherits(Point, Base.BasePoint), Point.prototype._getBeta = function () {
            function r(r) {
                return d.point(r.x.redMul(d.endo.beta), r.y)
            }

            if (this.curve.endo) {
                var e = this.precomputed;
                if (e && e.beta)return e.beta;
                var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                if (e) {
                    var d = this.curve;
                    e.beta = t, t.precomputed = {
                        beta: null,
                        naf: e.naf && {wnd: e.naf.wnd, points: e.naf.points.map(r)},
                        doubles: e.doubles && {step: e.doubles.step, points: e.doubles.points.map(r)}
                    }
                }
                return t
            }
        }, Point.prototype.toJSON = function () {
            return this.precomputed ? [this.x, this.y, this.precomputed && {
                doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1)
                },
                naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1)
                }
            }] : [this.x, this.y]
        }, Point.fromJSON = function (r, e, t) {
            function d(e) {
                return r.point(e[0], e[1], t)
            }

            "string" == typeof e && (e = JSON.parse(e));
            var i = r.point(e[0], e[1], t);
            if (!e[2])return i;
            var n = e[2];
            return i.precomputed = {
                beta: null,
                doubles: n.doubles && {step: n.doubles.step, points: [i].concat(n.doubles.points.map(d))},
                naf: n.naf && {wnd: n.naf.wnd, points: [i].concat(n.naf.points.map(d))}
            }, i
        }, Point.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16) + " y: " + this.y.fromRed().toString(16) + ">"
        }, Point.prototype.isInfinity = function () {
            return this.inf
        }, Point.prototype.add = function (r) {
            if (this.inf)return r;
            if (r.inf)return this;
            if (this.eq(r))return this.dbl();
            if (this.neg().eq(r))return this.curve.point(null, null);
            if (0 === this.x.cmp(r.x))return this.curve.point(null, null);
            var e = this.y.redSub(r.y);
            0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(r.x).redInvm()));
            var t = e.redSqr().redISub(this.x).redISub(r.x), d = e.redMul(this.x.redSub(t)).redISub(this.y);
            return this.curve.point(t, d)
        }, Point.prototype.dbl = function () {
            if (this.inf)return this;
            var r = this.y.redAdd(this.y);
            if (0 === r.cmpn(0))return this.curve.point(null, null);
            var e = this.curve.a, t = this.x.redSqr(), d = r.redInvm(), i = t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d), n = i.redSqr().redISub(this.x.redAdd(this.x)), u = i.redMul(this.x.redSub(n)).redISub(this.y);
            return this.curve.point(n, u)
        }, Point.prototype.getX = function () {
            return this.x.fromRed()
        }, Point.prototype.getY = function () {
            return this.y.fromRed()
        }, Point.prototype.mul = function (r) {
            return r = new bn(r, 16), this.precomputed && this.precomputed.doubles ? this.curve._fixedNafMul(this, r) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [r]) : this.curve._wnafMul(this, r)
        }, Point.prototype.mulAdd = function (r, e, t) {
            var d = [this, e], i = [r, t];
            return this.curve.endo ? this.curve._endoWnafMulAdd(d, i) : this.curve._wnafMulAdd(1, d, i, 2)
        }, Point.prototype.eq = function (r) {
            return this === r || this.inf === r.inf && (this.inf || 0 === this.x.cmp(r.x) && 0 === this.y.cmp(r.y))
        }, Point.prototype.neg = function (r) {
            function e(r) {
                return r.neg()
            }

            if (this.inf)return this;
            var t = this.curve.point(this.x, this.y.redNeg());
            if (r && this.precomputed) {
                var d = this.precomputed;
                t.precomputed = {
                    naf: d.naf && {wnd: d.naf.wnd, points: d.naf.points.map(e)},
                    doubles: d.doubles && {step: d.doubles.step, step: d.doubles.points.map(e)}
                }
            }
            return t
        }, Point.prototype.toJ = function () {
            if (this.inf)return this.curve.jpoint(null, null, null);
            var r = this.curve.jpoint(this.x, this.y, this.curve.one);
            return r
        }, inherits(JPoint, Base.BasePoint), JPoint.prototype.toP = function () {
            if (this.isInfinity())return this.curve.point(null, null);
            var r = this.z.redInvm(), e = r.redSqr(), t = this.x.redMul(e), d = this.y.redMul(e).redMul(r);
            return this.curve.point(t, d)
        }, JPoint.prototype.neg = function () {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
        }, JPoint.prototype.add = function (r) {
            if (this.isInfinity())return r;
            if (r.isInfinity())return this;
            var e = r.z.redSqr(), t = this.z.redSqr(), d = this.x.redMul(e), i = r.x.redMul(t), n = this.y.redMul(e.redMul(r.z)), u = r.y.redMul(t.redMul(this.z)), s = d.redSub(i), o = n.redSub(u);
            if (0 === s.cmpn(0))return 0 !== o.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var h = s.redSqr(), p = h.redMul(s), l = d.redMul(h), a = o.redSqr().redIAdd(p).redISub(l).redISub(l), b = o.redMul(l.redISub(a)).redISub(n.redMul(p)), f = this.z.redMul(r.z).redMul(s);
            return this.curve.jpoint(a, b, f)
        }, JPoint.prototype.mixedAdd = function (r) {
            if (this.isInfinity())return r.toJ();
            if (r.isInfinity())return this;
            var e = this.z.redSqr(), t = this.x, d = r.x.redMul(e), i = this.y, n = r.y.redMul(e).redMul(this.z), u = t.redSub(d), s = i.redSub(n);
            if (0 === u.cmpn(0))return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var o = u.redSqr(), h = o.redMul(u), p = t.redMul(o), l = s.redSqr().redIAdd(h).redISub(p).redISub(p), a = s.redMul(p.redISub(l)).redISub(i.redMul(h)), b = this.z.redMul(u);
            return this.curve.jpoint(l, a, b)
        }, JPoint.prototype.dblp = function (r) {
            if (0 === r)return this;
            if (this.isInfinity())return this;
            if (!r)return this.dbl();
            if (this.curve.zeroA || this.curve.threeA) {
                for (var e = this, t = 0; r > t; t++)e = e.dbl();
                return e
            }
            for (var d = this.curve.a, i = this.curve.tinv, n = this.x, u = this.y, s = this.z, o = s.redSqr().redSqr(), h = u.redAdd(u), t = 0; r > t; t++) {
                var p = n.redSqr(), l = h.redSqr(), a = l.redSqr(), b = p.redAdd(p).redIAdd(p).redIAdd(d.redMul(o)), f = n.redMul(l), c = b.redSqr().redISub(f.redAdd(f)), S = f.redISub(c), v = b.redMul(S);
                v = v.redIAdd(v).redISub(a);
                var I = h.redMul(s);
                r > t + 1 && (o = o.redMul(a)), n = c, s = I, h = v
            }
            return this.curve.jpoint(n, h.redMul(i), s)
        }, JPoint.prototype.dbl = function () {
            return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
        }, JPoint.prototype._zeroDbl = function () {
            if (this.zOne) {
                var r = this.x.redSqr(), e = this.y.redSqr(), t = e.redSqr(), d = this.x.redAdd(e).redSqr().redISub(r).redISub(t);
                d = d.redIAdd(d);
                var i = r.redAdd(r).redIAdd(r), n = i.redSqr().redISub(d).redISub(d), u = t.redIAdd(t);
                u = u.redIAdd(u), u = u.redIAdd(u);
                var s = n, o = i.redMul(d.redISub(n)).redISub(u), h = this.y.redAdd(this.y)
            } else {
                var p = this.x.redSqr(), l = this.y.redSqr(), a = l.redSqr(), b = this.x.redAdd(l).redSqr().redISub(p).redISub(a);
                b = b.redIAdd(b);
                var f = p.redAdd(p).redIAdd(p), c = f.redSqr(), S = a.redIAdd(a);
                S = S.redIAdd(S), S = S.redIAdd(S);
                var s = c.redISub(b).redISub(b), o = f.redMul(b.redISub(s)).redISub(S), h = this.y.redMul(this.z);
                h = h.redIAdd(h)
            }
            return this.curve.jpoint(s, o, h)
        }, JPoint.prototype._threeDbl = function () {
            if (this.zOne) {
                var r = this.x.redSqr(), e = this.y.redSqr(), t = e.redSqr(), d = this.x.redAdd(e).redSqr().redISub(r).redISub(t);
                d = d.redIAdd(d);
                var i = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a), n = i.redSqr().redISub(d).redISub(d), u = n, s = t.redIAdd(t);
                s = s.redIAdd(s), s = s.redIAdd(s);
                var o = i.redMul(d.redISub(n)).redISub(s), h = this.y.redAdd(this.y)
            } else {
                var p = this.z.redSqr(), l = this.y.redSqr(), a = this.x.redMul(l), b = this.x.redSub(p).redMul(this.x.redAdd(p));
                b = b.redAdd(b).redIAdd(b);
                var f = a.redIAdd(a);
                f = f.redIAdd(f);
                var c = f.redAdd(f), u = b.redSqr().redISub(c), h = this.y.redAdd(this.z).redSqr().redISub(l).redISub(p), S = l.redSqr();
                S = S.redIAdd(S), S = S.redIAdd(S), S = S.redIAdd(S);
                var o = b.redMul(f.redISub(u)).redISub(S)
            }
            return this.curve.jpoint(u, o, h)
        }, JPoint.prototype._dbl = function () {
            var r = this.curve.a, e = (this.curve.tinv, this.x), t = this.y, d = this.z, i = d.redSqr().redSqr(), n = e.redSqr(), u = t.redSqr(), s = n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)), o = e.redAdd(e);
            o = o.redIAdd(o);
            var h = o.redMul(u), p = s.redSqr().redISub(h.redAdd(h)), l = h.redISub(p), a = u.redSqr();
            a = a.redIAdd(a), a = a.redIAdd(a), a = a.redIAdd(a);
            var b = s.redMul(l).redISub(a), f = t.redAdd(t).redMul(d);
            return this.curve.jpoint(p, b, f)
        }, JPoint.prototype.trpl = function () {
            if (!this.curve.zeroA)return this.dbl().add(this);
            var r = this.x.redSqr(), e = this.y.redSqr(), t = this.z.redSqr(), d = e.redSqr(), i = r.redAdd(r).redIAdd(r), n = i.redSqr(), u = this.x.redAdd(e).redSqr().redISub(r).redISub(d);
            u = u.redIAdd(u), u = u.redAdd(u).redIAdd(u), u = u.redISub(n);
            var s = u.redSqr(), o = d.redIAdd(d);
            o = o.redIAdd(o), o = o.redIAdd(o), o = o.redIAdd(o);
            var h = i.redIAdd(u).redSqr().redISub(n).redISub(s).redISub(o), p = e.redMul(h);
            p = p.redIAdd(p), p = p.redIAdd(p);
            var l = this.x.redMul(s).redISub(p);
            l = l.redIAdd(l), l = l.redIAdd(l);
            var a = this.y.redMul(h.redMul(o.redISub(h)).redISub(u.redMul(s)));
            a = a.redIAdd(a), a = a.redIAdd(a), a = a.redIAdd(a);
            var b = this.z.redAdd(u).redSqr().redISub(t).redISub(s);
            return this.curve.jpoint(l, a, b)
        }, JPoint.prototype.mul = function (r, e) {
            return r = new bn(r, e), this.curve._wnafMul(this, r)
        }, JPoint.prototype.eq = function (r) {
            if ("affine" === r.type)return this.eq(r.toJ());
            if (this === r)return !0;
            var e = this.z.redSqr(), t = r.z.redSqr();
            if (0 !== this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0))return !1;
            var d = e.redMul(this.z), i = t.redMul(r.z);
            return 0 === this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)
        }, JPoint.prototype.inspect = function () {
            return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16) + " y: " + this.y.toString(16) + " z: " + this.z.toString(16) + ">"
        }, JPoint.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0)
        };
    }, {"../../elliptic": 116, "../curve": 119, "assert": 75, "bn.js": 129, "inherits": 136}],
    122: [function (require, module, exports) {
        function PresetCurve(f) {
            this.curve = "short" === f.type ? new elliptic.curve.short(f) : "edwards" === f.type ? new elliptic.curve.edwards(f) : new elliptic.curve.mont(f), this.g = this.curve.g, this.n = this.curve.n, this.hash = f.hash, assert(this.g.validate(), "Invalid curve"), assert(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
        }

        function defineCurve(f, e) {
            Object.defineProperty(curves, f, {
                configurable: !0, enumerable: !0, get: function () {
                    var d = new PresetCurve(e);
                    return Object.defineProperty(curves, f, {configurable: !0, enumerable: !0, value: d}), d
                }
            })
        }

        var curves = exports, assert = require("assert"), hash = require("hash.js"), bn = require("bn.js"), elliptic = require("../elliptic");
        curves.PresetCurve = PresetCurve, defineCurve("p192", {
            type: "short",
            prime: "p192",
            p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
            b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
            n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
            hash: hash.sha256,
            gRed: !1,
            g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
        }), defineCurve("p224", {
            type: "short",
            prime: "p224",
            p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
            b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
            n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
            hash: hash.sha256,
            gRed: !1,
            g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
        }), defineCurve("p256", {
            type: "short",
            prime: null,
            p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
            a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
            b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
            n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
            hash: hash.sha256,
            gRed: !1,
            g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
        }), defineCurve("curve25519", {
            type: "mont",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "76d06",
            b: "0",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: hash.sha256,
            gRed: !1,
            g: ["9"]
        }), defineCurve("ed25519", {
            type: "edwards",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "-1",
            c: "1",
            d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: hash.sha256,
            gRed: !1,
            g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
        }), defineCurve("secp256k1", {
            type: "short",
            prime: "k256",
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            a: "0",
            b: "7",
            n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
            h: "1",
            hash: hash.sha256,
            beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
            lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
            basis: [{
                a: "3086d221a7d46bcde86c90e49284eb15",
                b: "-e4437ed6010e88286f547fa90abfe4c3"
            }, {a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15"}],
            gRed: !1,
            g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", {
                doubles: {
                    step: 4,
                    points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]
                },
                naf: {
                    wnd: 7,
                    points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]
                }
            }]
        });
    }, {"../elliptic": 116, "assert": 75, "bn.js": 129, "hash.js": 130}],
    123: [function (require, module, exports) {
        function EC(t) {
            return this instanceof EC ? ("string" == typeof t && (t = elliptic.curves[t]), t instanceof elliptic.curves.PresetCurve && (t = {curve: t}), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.shrn(1), this.g = this.curve.g, this.g = t.curve.g, this.g.precompute(t.curve.n.bitLength() + 1), void(this.hash = t.hash || t.curve.hash)) : new EC(t)
        }

        var assert = require("assert"), bn = require("bn.js"), elliptic = require("../../elliptic"), utils = elliptic.utils, KeyPair = require("./key"), Signature = require("./signature");
        module.exports = EC, EC.prototype.keyPair = function (t, e) {
            return new KeyPair(this, t, e)
        }, EC.prototype.genKeyPair = function (t) {
            t || (t = {});
            for (var e = new elliptic.hmacDRBG({
                hash: this.hash,
                pers: t.pers,
                entropy: t.entropy || elliptic.rand(this.hash.hmacStrength),
                nonce: this.n.toArray()
            }), n = this.n.byteLength(), i = this.n.sub(new bn(2)); ;) {
                var r = new bn(e.generate(n));
                if (!(r.cmp(i) > 0))return r.iaddn(1), this.keyPair(r)
            }
        }, EC.prototype._truncateToN = function (t, e) {
            var n = 8 * t.byteLength() - this.n.bitLength();
            return n > 0 && (t = t.shrn(n)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
        }, EC.prototype.sign = function (t, e, n) {
            e = this.keyPair(e, "hex"), t = this._truncateToN(new bn(t, 16)), n || (n = {});
            for (var i = this.n.byteLength(), r = e.getPrivate().toArray(), h = r.length; 21 > h; h++)r.unshift(0);
            for (var s = t.toArray(), h = s.length; i > h; h++)s.unshift(0);
            for (var u = new elliptic.hmacDRBG({hash: this.hash, entropy: r, nonce: s}), a = this.n.sub(new bn(1)); ;) {
                var c = new bn(u.generate(this.n.byteLength()));
                if (c = this._truncateToN(c, !0), !(c.cmpn(1) <= 0 || c.cmp(a) >= 0)) {
                    var o = this.g.mul(c);
                    if (!o.isInfinity()) {
                        var p = o.getX().mod(this.n);
                        if (0 !== p.cmpn(0)) {
                            var v = c.invm(this.n).mul(p.mul(e.getPrivate()).iadd(t)).mod(this.n);
                            if (0 !== v.cmpn(0))return n.canonical && v.cmp(this.nh) > 0 && (v = this.n.sub(v)), new Signature(p, v)
                        }
                    }
                }
            }
        }, EC.prototype.verify = function (t, e, n) {
            t = this._truncateToN(new bn(t, 16)), n = this.keyPair(n, "hex"), e = new Signature(e, "hex");
            var i = e.r, r = e.s;
            if (i.cmpn(1) < 0 || i.cmp(this.n) >= 0)return !1;
            if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)return !1;
            var h = r.invm(this.n), s = h.mul(t).mod(this.n), u = h.mul(i).mod(this.n), a = this.g.mulAdd(s, n.getPublic(), u);
            return a.isInfinity() ? !1 : 0 === a.getX().mod(this.n).cmp(i)
        };
    }, {"../../elliptic": 116, "./key": 124, "./signature": 125, "assert": 75, "bn.js": 129}],
    124: [function (require, module, exports) {
        function KeyPair(t, i, e) {
            return i instanceof KeyPair ? i : e instanceof KeyPair ? e : (i || (i = e, e = null), null !== i && "object" == typeof i && (i.x ? (e = i, i = null) : (i.priv || i.pub) && (e = i.pub, i = i.priv)), this.ec = t, this.priv = null, this.pub = null, void(this._importPublicHex(i, e) || ("hex" === e && (e = null), i && this._importPrivate(i), e && this._importPublic(e))))
        }

        var assert = require("assert"), bn = require("bn.js"), elliptic = require("../../elliptic"), utils = elliptic.utils;
        module.exports = KeyPair, KeyPair.prototype.validate = function () {
            var t = this.getPublic();
            return t.isInfinity() ? {
                result: !1,
                reason: "Invalid public key"
            } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {result: !0, reason: null} : {
                result: !1,
                reason: "Public key * N != O"
            } : {result: !1, reason: "Public key is not a point"}
        }, KeyPair.prototype.getPublic = function (t, i) {
            if (this.pub || (this.pub = this.ec.g.mul(this.priv)), "string" == typeof t && (i = t, t = null), !i)return this.pub;
            for (var e = this.ec.curve.p.byteLength(), r = this.pub.getX().toArray(), n = r.length; e > n; n++)r.unshift(0);
            if (t)var u = [this.pub.getY().isEven() ? 2 : 3].concat(r); else {
                for (var s = this.pub.getY().toArray(), n = s.length; e > n; n++)s.unshift(0);
                var u = [4].concat(r, s)
            }
            return utils.encode(u, i)
        }, KeyPair.prototype.getPrivate = function (t) {
            return "hex" === t ? this.priv.toString(16) : this.priv
        }, KeyPair.prototype._importPrivate = function (t) {
            this.priv = new bn(t, 16), this.priv = this.priv.mod(this.ec.curve.n)
        }, KeyPair.prototype._importPublic = function (t) {
            this.pub = this.ec.curve.point(t.x, t.y)
        }, KeyPair.prototype._importPublicHex = function (t, i) {
            t = utils.toArray(t, i);
            var e = this.ec.curve.p.byteLength();
            if (4 === t[0] && t.length - 1 === 2 * e)this.pub = this.ec.curve.point(t.slice(1, 1 + e), t.slice(1 + e, 1 + 2 * e)); else {
                if (2 !== t[0] && 3 !== t[0] || t.length - 1 !== e)return !1;
                this.pub = this.ec.curve.pointFromX(3 === t[0], t.slice(1, 1 + e))
            }
            return !0
        }, KeyPair.prototype.derive = function (t) {
            return t.mul(this.priv).getX()
        }, KeyPair.prototype.sign = function (t) {
            return this.ec.sign(t, this)
        }, KeyPair.prototype.verify = function (t, i) {
            return this.ec.verify(t, i, this)
        }, KeyPair.prototype.inspect = function () {
            return "<Key priv: " + (this.priv && this.priv.toString(16)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
        };
    }, {"../../elliptic": 116, "assert": 75, "bn.js": 129}],
    125: [function (require, module, exports) {
        function Signature(t, r) {
            return t instanceof Signature ? t : void(this._importDER(t, r) || (assert(t && r, "Signature without r or s"), this.r = new bn(t, 16), this.s = new bn(r, 16)))
        }

        var assert = require("assert"), bn = require("bn.js"), elliptic = require("../../elliptic"), utils = elliptic.utils;
        module.exports = Signature, Signature.prototype._importDER = function (t, r) {
            if (t = utils.toArray(t, r), t.length < 6 || 48 !== t[0] || 2 !== t[2])return !1;
            var e = t[1];
            if (1 + e > t.length)return !1;
            var n = t[3];
            if (n >= 128)return !1;
            if (4 + n + 2 >= t.length)return !1;
            if (2 !== t[4 + n])return !1;
            var i = t[5 + n];
            return i >= 128 ? !1 : 4 + n + 2 + i > t.length ? !1 : (this.r = new bn(t.slice(4, 4 + n)), this.s = new bn(t.slice(4 + n + 2, 4 + n + 2 + i)), !0)
        }, Signature.prototype.toDER = function (t) {
            var r = this.r.toArray(), e = this.s.toArray();
            128 & r[0] && (r = [0].concat(r)), 128 & e[0] && (e = [0].concat(e));
            var n = r.length + e.length + 4, i = [48, n, 2, r.length];
            return i = i.concat(r, [2, e.length], e), utils.encode(i, t)
        };
    }, {"../../elliptic": 116, "assert": 75, "bn.js": 129}],
    126: [function (require, module, exports) {
        function HmacDRBG(t) {
            if (!(this instanceof HmacDRBG))return new HmacDRBG(t);
            this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this.reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
            var e = utils.toArray(t.entropy, t.entropyEnc), i = utils.toArray(t.nonce, t.nonceEnc), s = utils.toArray(t.pers, t.persEnc);
            assert(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(e, i, s)
        }

        var assert = require("assert"), hash = require("hash.js"), elliptic = require("../elliptic"), utils = elliptic.utils;
        module.exports = HmacDRBG, HmacDRBG.prototype._init = function (t, e, i) {
            var s = t.concat(e).concat(i);
            this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
            for (var h = 0; h < this.V.length; h++)this.K[h] = 0, this.V[h] = 1;
            this._update(s), this.reseed = 1, this.reseedInterval = 281474976710656
        }, HmacDRBG.prototype._hmac = function () {
            return new hash.hmac(this.hash, this.K)
        }, HmacDRBG.prototype._update = function (t) {
            var e = this._hmac().update(this.V).update([0]);
            t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest())
        }, HmacDRBG.prototype.reseed = function (t, e, i, s) {
            "string" != typeof e && (s = i, i = e, e = null), t = utils.toBuffer(t, e), i = utils.toBuffer(i, s), assert(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(i || [])), this.reseed = 1
        }, HmacDRBG.prototype.generate = function (t, e, i, s) {
            if (this.reseed > this.reseedInterval)throw new Error("Reseed is required");
            "string" != typeof e && (s = i, i = e, e = null), i && (i = utils.toArray(i, s), this._update(i));
            for (var h = []; h.length < t;)this.V = this._hmac().update(this.V).digest(), h = h.concat(this.V);
            var r = h.slice(0, t);
            return this._update(i), this.reseed++, utils.encode(r, e)
        };
    }, {"../elliptic": 116, "assert": 75, "hash.js": 130}],
    127: [function (require, module, exports) {
        function Rand() {
        }

        var assert = require("assert"), elliptic = require("../elliptic"), r;
        if (module.exports = function (t) {
                return r || (r = new Rand), r.generate(t)
            }, Rand.prototype.generate = function (r) {
                return this._rand(r)
            }, "object" == typeof window)Rand.prototype._rand = window.crypto && window.crypto.getRandomValues ? function (r) {
            var t = new Uint8Array(r);
            return window.crypto.getRandomValues(t), t
        } : function () {
            throw new Error("Not implemented yet")
        }; else {
            var crypto;
            Rand.prototype._rand = function (r) {
                return crypto || (crypto = require("crypto")), crypto.randomBytes(r)
            }
        }
    }, {"../elliptic": 116, "assert": 75, "crypto": 82}],
    128: [function (require, module, exports) {
        function toArray(r, e) {
            if (Array.isArray(r))return r.slice();
            if (!r)return [];
            var n = [];
            if ("string" == typeof r)if (e) {
                if ("hex" === e) {
                    r = r.replace(/[^a-z0-9]+/gi, ""), r.length % 2 !== 0 && (r = "0" + r);
                    for (var t = 0; t < r.length; t += 2)n.push(parseInt(r[t] + r[t + 1], 16))
                }
            } else for (var t = 0; t < r.length; t++) {
                var a = r.charCodeAt(t), s = a >> 8, i = 255 & a;
                s ? n.push(s, i) : n.push(i)
            } else for (var t = 0; t < r.length; t++)n[t] = 0 | r[t];
            return n
        }

        function toHex(r) {
            for (var e = "", n = 0; n < r.length; n++)e += zero2(r[n].toString(16));
            return e
        }

        function zero2(r) {
            return 1 === r.length ? "0" + r : r
        }

        function getNAF(r, e) {
            for (var n = [], t = 1 << e + 1, a = r.clone(); a.cmpn(1) >= 0;) {
                var s;
                if (a.isOdd()) {
                    var i = a.andln(t - 1);
                    s = i > (t >> 1) - 1 ? (t >> 1) - i : i, a.isubn(s)
                } else s = 0;
                n.push(s);
                for (var o = 0 !== a.cmpn(0) && 0 === a.andln(t - 1) ? e + 1 : 1, u = 1; o > u; u++)n.push(0);
                a.ishrn(o)
            }
            return n
        }

        function getJSF(r, e) {
            var n = [[], []];
            r = r.clone(), e = e.clone();
            for (var t = 0, a = 0; r.cmpn(-t) > 0 || e.cmpn(-a) > 0;) {
                var s = r.andln(3) + t & 3, i = e.andln(3) + a & 3;
                3 === s && (s = -1), 3 === i && (i = -1);
                var o;
                if (0 === (1 & s))o = 0; else {
                    var u = r.andln(7) + t & 7;
                    o = 3 !== u && 5 !== u || 2 !== i ? s : -s
                }
                n[0].push(o);
                var l;
                if (0 === (1 & i))l = 0; else {
                    var u = e.andln(7) + a & 7;
                    l = 3 !== u && 5 !== u || 2 !== s ? i : -i
                }
                n[1].push(l), 2 * t === o + 1 && (t = 1 - t), 2 * a === l + 1 && (a = 1 - a), r.ishrn(1), e.ishrn(1)
            }
            return n
        }

        var assert = require("assert"), bn = require("bn.js"), utils = exports;
        utils.toArray = toArray, utils.toHex = toHex, utils.encode = function (r, e) {
            return "hex" === e ? toHex(r) : r
        }, utils.zero2 = zero2, utils.getNAF = getNAF, utils.getJSF = getJSF;
    }, {"assert": 75, "bn.js": 129}],
    129: [function (require, module, exports) {
        function assert(t, r) {
            if (!t)throw new Error(r || "Assertion failed")
        }

        function assertEqual(t, r, i) {
            if (t != r)throw new Error(i || "Assertion failed: " + t + " != " + r)
        }

        function inherits(t, r) {
            t.super_ = r;
            var i = function () {
            };
            i.prototype = r.prototype, t.prototype = new i, t.prototype.constructor = t
        }

        function BN(t, r) {
            return null !== t && "object" == typeof t && Array.isArray(t.words) ? t : (this.sign = !1, this.words = null, this.length = 0, this.red = null, void(null !== t && this._init(t || 0, r || 10)))
        }

        function zero6(t) {
            return 5 === t.length ? "0" + t : 4 === t.length ? "00" + t : 3 === t.length ? "000" + t : 2 === t.length ? "0000" + t : 1 === t.length ? "00000" + t : t
        }

        function zero14(t) {
            return 13 === t.length ? "0" + t : 12 === t.length ? "00" + t : 11 === t.length ? "000" + t : 10 === t.length ? "0000" + t : 9 === t.length ? "00000" + t : 8 === t.length ? "000000" + t : 7 === t.length ? "0000000" + t : 6 === t.length ? "00000000" + t : 5 === t.length ? "000000000" + t : 4 === t.length ? "0000000000" + t : 3 === t.length ? "00000000000" + t : 2 === t.length ? "000000000000" + t : 1 === t.length ? "0000000000000" + t : t
        }

        function MPrime(t, r) {
            this.name = t, this.p = new BN(r, 16), this.n = this.p.bitLength(), this.k = new BN(1).ishln(this.n).isub(this.p), this.tmp = this._tmp()
        }

        function K256() {
            MPrime.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
        }

        function P224() {
            MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
        }

        function P192() {
            MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
        }

        function P25519() {
            MPrime.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
        }

        function Red(t) {
            if ("string" == typeof t) {
                var r = BN._prime(t);
                this.m = r.p, this.prime = r
            } else this.m = t, this.prime = null
        }

        function Mont(t) {
            Red.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new BN(1).ishln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r.invm(this.m), this.minv = this.rinv.mul(this.r).sub(new BN(1)).div(this.m).neg().mod(this.r)
        }

        module.exports = BN, BN.BN = BN, BN.wordSize = 26, BN.prototype._init = function (t, r) {
            if ("number" == typeof t)return 0 > t && (this.sign = !0, t = -t), this.words = [67108863 & t], void(this.length = 1);
            if ("object" == typeof t) {
                assert("number" == typeof t.length), this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++)this.words[i] = 0;
                for (var s = 0, i = t.length - 1, n = 0; i >= 0; i -= 3) {
                    var e = t[i] | t[i - 1] << 8 | t[i - 2] << 16;
                    this.words[n] |= e << s & 67108863, this.words[n + 1] = e >>> 26 - s & 67108863, s += 24, s >= 26 && (s -= 26, n++)
                }
                return this.strip()
            }
            "hex" === r && (r = 16), assert(16 >= r), t = t.toString().replace(/\s+/g, "");
            var h = 0;
            "-" === t[0] && h++, 16 === r ? this._parseHex(t, h) : this._parseBase(t, r, h), "-" === t[0] && (this.sign = !0), this.strip()
        }, BN.prototype._parseHex = function (t, r) {
            this.length = Math.ceil((t.length - r) / 6), this.words = new Array(this.length);
            for (var i = 0; i < this.length; i++)this.words[i] = 0;
            for (var s = 0, i = t.length - 6, n = 0; i >= r; i -= 6) {
                var e = parseInt(t.slice(i, i + 6), 16);
                this.words[n] |= e << s & 67108863, this.words[n + 1] |= e >>> 26 - s & 4194303, s += 24, s >= 26 && (s -= 26, n++)
            }
            if (i + 6 !== r) {
                var e = parseInt(t.slice(r, i + 6), 16);
                this.words[n] |= e << s & 67108863, this.words[n + 1] |= e >>> 26 - s & 4194303
            }
            this.strip()
        }, BN.prototype._parseBase = function (t, r, i) {
            this.words = [0], this.length = 1;
            for (var s = 0, n = 1, e = 0, h = null, o = i; o < t.length; o++) {
                var f, d = t[o];
                f = 10 === r || "9" >= d ? 0 | d : d >= "a" ? d.charCodeAt(0) - 97 + 10 : d.charCodeAt(0) - 65 + 10, s *= r, s += f, n *= r, e++, n > 1048575 && (assert(67108863 >= n), h || (h = new BN(n)), this.mul(h).copy(this), this.iadd(new BN(s)), s = 0, n = 1, e = 0)
            }
            0 !== e && (this.mul(new BN(n)).copy(this), this.iadd(new BN(s)))
        }, BN.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var r = 0; r < this.length; r++)t.words[r] = this.words[r];
            t.length = this.length, t.sign = this.sign, t.red = this.red
        }, BN.prototype.clone = function () {
            var t = new BN(null);
            return this.copy(t), t
        }, BN.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1];)this.length--;
            return this._normSign()
        }, BN.prototype._normSign = function () {
            return 1 === this.length && 0 === this.words[0] && (this.sign = !1), this
        }, BN.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
        };
        var div10 = new BN(null);
        div10.words = [8011776, 1490116], div10.length = 2, BN.prototype.toString = function (t) {
            if (t = t || 10, 16 === t || "hex" === t) {
                for (var r = "", i = 0, s = 0, n = 0; n < this.length; n++) {
                    var e = this.words[n], h = (16777215 & (e << i | s)).toString(16);
                    s = e >>> 24 - i & 16777215, r = 0 !== s || n !== this.length - 1 ? zero6(h) + r : h + r, i += 2, i >= 26 && (i -= 26, n--)
                }
                return 0 !== s && (r = s.toString(16) + r), this.sign && (r = "-" + r), r
            }
            if (10 === t) {
                var r = "", o = this.clone();
                for (o.sign = !1; 0 !== o.cmpn(0);) {
                    var f = o.modn(1e6);
                    o = o.idivn(1e6), r = 0 !== o.cmpn(0) ? zero6(f + "") + r : f + r
                }
                return 0 === this.cmpn(0) && (r = "0" + r), this.sign && (r = "-" + r), r
            }
            assert(!1, "Only 16 and 10 base are supported")
        }, BN.prototype.toJSON = function () {
            return this.toString(16)
        }, BN.prototype.toArray = function () {
            this.strip();
            var t = new Array(this.byteLength());
            t[0] = 0;
            for (var r = this.clone(), i = 0; 0 !== r.cmpn(0); i++) {
                var s = r.andln(255);
                r.ishrn(8), t[t.length - i - 1] = s
            }
            return t
        }, BN.prototype._countBits = function (t) {
            return t >= 33554432 ? 26 : t >= 16777216 ? 25 : t >= 8388608 ? 24 : t >= 4194304 ? 23 : t >= 2097152 ? 22 : t >= 1048576 ? 21 : t >= 524288 ? 20 : t >= 262144 ? 19 : t >= 131072 ? 18 : t >= 65536 ? 17 : t >= 32768 ? 16 : t >= 16384 ? 15 : t >= 8192 ? 14 : t >= 4096 ? 13 : t >= 2048 ? 12 : t >= 1024 ? 11 : t >= 512 ? 10 : t >= 256 ? 9 : t >= 128 ? 8 : t >= 64 ? 7 : t >= 32 ? 6 : t >= 16 ? 5 : t >= 8 ? 4 : t >= 4 ? 3 : t >= 2 ? 2 : t >= 1 ? 1 : 0
        }, BN.prototype.bitLength = function () {
            var t = 0, r = this.words[this.length - 1], t = this._countBits(r);
            return 26 * (this.length - 1) + t
        }, BN.prototype.byteLength = function () {
            this.words[this.length - 1];
            return Math.ceil(this.bitLength() / 8)
        }, BN.prototype.neg = function () {
            if (0 === this.cmpn(0))return this.clone();
            var t = this.clone();
            return t.sign = !this.sign, t
        }, BN.prototype.iadd = function (t) {
            if (this.sign && !t.sign) {
                this.sign = !1;
                var r = this.isub(t);
                return this.sign = !this.sign, this._normSign()
            }
            if (!this.sign && t.sign) {
                t.sign = !1;
                var r = this.isub(t);
                return t.sign = !0, r._normSign()
            }
            var i, s;
            this.length > t.length ? (i = this, s = t) : (i = t, s = this);
            for (var n = 0, e = 0; e < s.length; e++) {
                var r = i.words[e] + s.words[e] + n;
                this.words[e] = 67108863 & r, n = r >>> 26
            }
            for (; 0 !== n && e < i.length; e++) {
                var r = i.words[e] + n;
                this.words[e] = 67108863 & r, n = r >>> 26
            }
            if (this.length = i.length, 0 !== n)this.words[this.length] = n, this.length++; else if (i !== this)for (; e < i.length; e++)this.words[e] = i.words[e];
            return this
        }, BN.prototype.add = function (t) {
            if (t.sign && !this.sign) {
                t.sign = !1;
                var r = this.sub(t);
                return t.sign = !0, r
            }
            if (!t.sign && this.sign) {
                this.sign = !1;
                var r = t.sub(this);
                return this.sign = !0, r
            }
            return this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
        }, BN.prototype.isub = function (t) {
            if (t.sign) {
                t.sign = !1;
                var r = this.iadd(t);
                return t.sign = !0, r._normSign()
            }
            if (this.sign)return this.sign = !1, this.iadd(t), this.sign = !0, this._normSign();
            var i = this.cmp(t);
            if (0 === i)return this.sign = !1, this.length = 1, this.words[0] = 0, this;
            if (i > 0)var s = this, n = t; else var s = t, n = this;
            for (var e = 0, h = 0; h < n.length; h++) {
                var r = s.words[h] - n.words[h] - e;
                0 > r ? (r += 67108864, e = 1) : e = 0, this.words[h] = r
            }
            for (; 0 !== e && h < s.length; h++) {
                var r = s.words[h] - e;
                0 > r ? (r += 67108864, e = 1) : e = 0, this.words[h] = r
            }
            if (0 === e && h < s.length && s !== this)for (; h < s.length; h++)this.words[h] = s.words[h];
            return this.length = Math.max(this.length, h), s !== this && (this.sign = !0), this.strip()
        }, BN.prototype.sub = function (t) {
            return this.clone().isub(t)
        }, BN.prototype.mulTo = function (t, r) {
            r.sign = t.sign !== this.sign, r.length = this.length + t.length;
            for (var i = 0, s = 0; s < r.length - 1; s++) {
                for (var n = i >>> 26, e = 67108863 & i, h = Math.min(s, t.length - 1), o = Math.max(0, s - this.length + 1); h >= o; o++) {
                    var f = s - o, d = this.words[f], u = t.words[o], l = d * u, p = 67108863 & l;
                    n += l / 67108864 | 0, p += e, e = 67108863 & p, n += p >>> 26
                }
                r.words[s] = e, i = n
            }
            return 0 !== i ? r.words[s] = i : r.length--, r.strip()
        }, BN.prototype.mul = function (t) {
            var r = new BN(null);
            return r.words = new Array(this.length + t.length), this.mulTo(t, r)
        }, BN.prototype.imul = function (t) {
            if (0 === this.cmpn(0) || 0 === t.cmpn(0))return this.words[0] = 0, this.length = 1, this;
            var r = this.length, i = t.length;
            this.sign = t.sign !== this.sign, this.length = this.length + t.length, this.words[this.length - 1] = 0;
            for (var s = this.length - 2; s >= 0; s--) {
                for (var n = 0, e = 0, h = Math.min(s, i - 1), o = Math.max(0, s - r + 1); h >= o; o++) {
                    var f = s - o, d = this.words[f], u = t.words[o], l = d * u, p = 67108863 & l;
                    n += l / 67108864 | 0, p += e, e = 67108863 & p, n += p >>> 26
                }
                this.words[s] = e, this.words[s + 1] += n, n = 0
            }
            for (var n = 0, f = 1; f < this.length; f++) {
                var a = this.words[f] + n;
                this.words[f] = 67108863 & a, n = a >>> 26
            }
            return this.strip()
        }, BN.prototype.sqr = function () {
            return this.mul(this)
        }, BN.prototype.isqr = function () {
            return this.mul(this)
        }, BN.prototype.ishln = function (t) {
            assert("number" == typeof t && t >= 0);
            {
                var r = t % 26, i = (t - r) / 26, s = 67108863 >>> 26 - r << 26 - r;
                this.clone()
            }
            if (0 !== r) {
                for (var n = 0, e = 0; e < this.length; e++) {
                    var h = this.words[e] & s, o = this.words[e] - h << r;
                    this.words[e] = o | n, n = h >>> 26 - r
                }
                n && (this.words[e] = n, this.length++)
            }
            if (0 !== i) {
                for (var e = this.length - 1; e >= 0; e--)this.words[e + i] = this.words[e];
                for (var e = 0; i > e; e++)this.words[e] = 0;
                this.length += i
            }
            return this.strip()
        }, BN.prototype.ishrn = function (t, r, i) {
            assert("number" == typeof t && t >= 0), r = r ? (r - r % 26) / 26 : 0;
            var s = t % 26, n = Math.min((t - s) / 26, this.length), e = 67108863 ^ 67108863 >>> s << s, h = i;
            if (r -= n, r = Math.max(0, r), h) {
                for (var o = 0; n > o; o++)h.words[o] = this.words[o];
                h.length = n
            }
            if (0 === n); else if (this.length > n) {
                this.length -= n;
                for (var o = 0; o < this.length; o++)this.words[o] = this.words[o + n]
            } else this.words[0] = 0, this.length = 1;
            for (var f = 0, o = this.length - 1; o >= 0 && (0 !== f || o >= r); o--) {
                var d = this.words[o];
                this.words[o] = f << 26 - s | d >>> s, f = d & e
            }
            return h && 0 !== f && (h.words[h.length++] = f), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip(), i ? {
                hi: this,
                lo: h
            } : this
        }, BN.prototype.shln = function (t) {
            return this.clone().ishln(t)
        }, BN.prototype.shrn = function (t) {
            return this.clone().ishrn(t)
        }, BN.prototype.imaskn = function (t) {
            assert("number" == typeof t && t >= 0);
            var r = t % 26, i = (t - r) / 26;
            if (assert(!this.sign, "imaskn works only with positive numbers"), 0 !== r && i++, this.length = Math.min(i, this.length), 0 !== r) {
                var s = 67108863 ^ 67108863 >>> r << r;
                this.words[this.length - 1] &= s
            }
            return this.strip()
        }, BN.prototype.maskn = function (t) {
            return this.clone().imaskn(t)
        }, BN.prototype.iaddn = function (t) {
            if (assert("number" == typeof t), 0 > t)return this.isubn(t);
            this.words[0] += t;
            for (var r = 0; r < this.length && this.words[r] >= 67108864; r++)this.words[r] -= 67108864, r === this.length - 1 ? this.words[r + 1] = 1 : this.words[r + 1]++;
            return this.length = Math.max(this.length, r + 1), this
        }, BN.prototype.isubn = function (t) {
            if (assert("number" == typeof t), assert(this.cmpn(t) >= 0, "Sign change is not supported in isubn"), 0 > t)return this.iaddn(-t);
            this.words[0] -= t;
            for (var r = 0; r < this.length && this.words[r] < 0; r++)this.words[r] += 67108864, this.words[r + 1] -= 1;
            return this.strip()
        }, BN.prototype.addn = function (t) {
            return this.clone().iaddn(t)
        }, BN.prototype.subn = function (t) {
            return this.clone().isubn(t)
        }, BN.prototype._wordDiv = function (t, r) {
            for (var i = this.length - t.length, s = this.clone(), n = t, e = "mod" !== r && new BN(0); s.length > n.length;) {
                var h = 67108864 * s.words[s.length - 1] + s.words[s.length - 2], o = h / n.words[n.length - 1], f = o / 67108864 | 0, d = 67108863 & o;
                o = new BN(null), o.words = [d, f], o.length = 2;
                var i = 26 * (s.length - n.length - 1);
                if (e) {
                    var u = o.shln(i);
                    s.sign ? e.isub(u) : e.iadd(u)
                }
                o = o.mul(n).ishln(i), s.sign ? s.iadd(o) : s.isub(o)
            }
            for (; s.ucmp(n) >= 0;) {
                var h = s.words[s.length - 1], o = new BN(h / n.words[n.length - 1] | 0), i = 26 * (s.length - n.length);
                if (e) {
                    var u = o.shln(i);
                    s.sign ? e.isub(u) : e.iadd(u)
                }
                o = o.mul(n).ishln(i), s.sign ? s.iadd(o) : s.isub(o)
            }
            return s.sign && (e && e.isubn(1), s.iadd(n)), {div: e ? e : null, mod: s}
        }, BN.prototype.divmod = function (t, r) {
            if (assert(0 !== t.cmpn(0)), this.sign && !t.sign) {
                var i, s, n = this.neg().divmod(t, r);
                return "mod" !== r && (i = n.div.neg()), "div" !== r && (s = 0 === n.mod.cmpn(0) ? n.mod : t.sub(n.mod)), {
                    div: i,
                    mod: s
                }
            }
            if (!this.sign && t.sign) {
                var i, n = this.divmod(t.neg(), r);
                return "mod" !== r && (i = n.div.neg()), {div: i, mod: n.mod}
            }
            return this.sign && t.sign ? this.neg().divmod(t.neg(), r) : t.length > this.length || this.cmp(t) < 0 ? {
                div: new BN(0),
                mod: this
            } : 1 === t.length ? "div" === r ? {div: this.divn(t.words[0]), mod: null} : "mod" === r ? {
                div: null,
                mod: new BN(this.modn(t.words[0]))
            } : {div: this.divn(t.words[0]), mod: new BN(this.modn(t.words[0]))} : this._wordDiv(t, r)
        }, BN.prototype.div = function (t) {
            return this.divmod(t, "div").div
        }, BN.prototype.mod = function (t) {
            return this.divmod(t, "mod").mod
        }, BN.prototype.divRound = function (t) {
            var r = this.divmod(t);
            if (0 === r.mod.cmpn(0))return r.div;
            var i = r.div.sign ? r.mod.isub(t) : r.mod, s = t.shrn(1), n = t.andln(1), e = i.cmp(s);
            return 0 > e || 1 === n && 0 === e ? r.div : r.div.sign ? r.div.isubn(1) : r.div.iaddn(1)
        }, BN.prototype.modn = function (t) {
            assert(67108863 >= t);
            for (var r = (1 << 26) % t, i = 0, s = this.length - 1; s >= 0; s--)i = (r * i + this.words[s]) % t;
            return i
        }, BN.prototype.idivn = function (t) {
            assert(67108863 >= t);
            for (var r = 0, i = this.length - 1; i >= 0; i--) {
                var s = this.words[i] + 67108864 * r;
                this.words[i] = s / t | 0, r = s % t
            }
            return this.strip()
        }, BN.prototype.divn = function (t) {
            return this.clone().idivn(t)
        }, BN.prototype._egcd = function (t, r) {
            assert(!r.sign), assert(0 !== r.cmpn(0));
            var i = this, s = r.clone();
            i = i.sign ? i.mod(r) : i.clone();
            for (var n = new BN(0); i.cmpn(1) > 0 && s.cmpn(1) > 0;) {
                for (; i.isEven();)i.ishrn(1), t.isEven() ? t.ishrn(1) : t.iadd(r).ishrn(1);
                for (; s.isEven();)s.ishrn(1), n.isEven() ? n.ishrn(1) : n.iadd(r).ishrn(1);
                i.cmp(s) >= 0 ? (i.isub(s), t.isub(n)) : (s.isub(i), n.isub(t))
            }
            return 0 === i.cmpn(1) ? t : n
        }, BN.prototype.invm = function (t) {
            return this._egcd(new BN(1), t).mod(t)
        }, BN.prototype.isEven = function () {
            return 0 === (1 & this.words[0])
        }, BN.prototype.isOdd = function () {
            return 1 === (1 & this.words[0])
        }, BN.prototype.andln = function (t) {
            return this.words[0] & t
        }, BN.prototype.bincn = function (t) {
            assert("number" == typeof t);
            var r = t % 26, i = (t - r) / 26, s = 1 << r;
            if (this.length <= i) {
                for (var n = this.length; i + 1 > n; n++)this.words[n] = 0;
                return this.words[i] |= s, this.length = i + 1, this
            }
            for (var e = s, n = i; 0 !== e && n < this.length; n++) {
                var h = this.words[n];
                h += e, e = h >>> 26, h &= 67108863, this.words[n] = h
            }
            return 0 !== e && (this.words[n] = e, this.length++), this
        }, BN.prototype.cmpn = function (t) {
            var r = 0 > t;
            if (r && (t = -t), this.sign && !r)return -1;
            if (!this.sign && r)return 1;
            t &= 67108863, this.strip();
            var i;
            if (this.length > 1)i = 1; else {
                var s = this.words[0];
                i = s === t ? 0 : t > s ? -1 : 1
            }
            return this.sign && (i = -i), i
        }, BN.prototype.cmp = function (t) {
            if (this.sign && !t.sign)return -1;
            if (!this.sign && t.sign)return 1;
            var r = this.ucmp(t);
            return this.sign ? -r : r
        }, BN.prototype.ucmp = function (t) {
            if (this.length > t.length)return 1;
            if (this.length < t.length)return -1;
            for (var r = 0, i = this.length - 1; i >= 0; i--) {
                var s = this.words[i], n = t.words[i];
                if (s !== n) {
                    n > s ? r = -1 : s > n && (r = 1);
                    break
                }
            }
            return r
        }, BN.red = function (t) {
            return new Red(t)
        }, BN.prototype.toRed = function (t) {
            return assert(!this.red, "Already a number in reduction context"), assert(!this.sign, "red works only with positives"), t.convertTo(this)._forceRed(t)
        }, BN.prototype.fromRed = function () {
            return assert(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
        }, BN.prototype._forceRed = function (t) {
            return this.red = t, this
        }, BN.prototype.forceRed = function (t) {
            return assert(!this.red, "Already a number in reduction context"), this._forceRed(t)
        }, BN.prototype.redAdd = function (t) {
            return assert(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
        }, BN.prototype.redIAdd = function (t) {
            return assert(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
        }, BN.prototype.redSub = function (t) {
            return assert(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
        }, BN.prototype.redISub = function (t) {
            return assert(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
        }, BN.prototype.redShl = function (t) {
            return assert(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
        }, BN.prototype.redMul = function (t) {
            return assert(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
        }, BN.prototype.redIMul = function (t) {
            return assert(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
        }, BN.prototype.redSqr = function () {
            return assert(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
        }, BN.prototype.redISqr = function () {
            return assert(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
        }, BN.prototype.redSqrt = function () {
            return assert(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
        }, BN.prototype.redInvm = function () {
            return assert(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
        }, BN.prototype.redNeg = function () {
            return assert(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
        }, BN.prototype.redPow = function (t) {
            return assert(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
        };
        var primes = {k256: null, p224: null, p192: null, p25519: null};
        MPrime.prototype._tmp = function () {
            var t = new BN(null);
            return t.words = new Array(Math.ceil(this.n / 13)), t
        }, MPrime.prototype.ireduce = function (t) {
            var r, i = t;
            do {
                var s = i.ishrn(this.n, 0, this.tmp);
                i = this.imulK(s.hi), i = i.iadd(s.lo), r = i.bitLength()
            } while (r > this.n);
            var n = r < this.n ? -1 : i.cmp(this.p);
            return 0 === n ? (i.words[0] = 0, i.length = 1) : n > 0 ? i.isub(this.p) : i.strip(), i
        }, MPrime.prototype.imulK = function (t) {
            return t.imul(this.k)
        }, inherits(K256, MPrime), K256.prototype.imulK = function (t) {
            t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
            for (var r = t.length - 3; r >= 0; r--) {
                var i = t.words[r], s = 64 * i, n = 977 * i;
                s += n / 67108864 | 0;
                var e = s / 67108864 | 0;
                s &= 67108863, n &= 67108863, t.words[r + 2] += e, t.words[r + 1] += s, t.words[r] = n
            }
            var i = t.words[t.length - 2];
            return i >= 67108864 && (t.words[t.length - 1] += i >>> 26, t.words[t.length - 2] = 67108863 & i), 0 === t.words[t.length - 1] && t.length--, 0 === t.words[t.length - 1] && t.length--, t
        }, inherits(P224, MPrime), inherits(P192, MPrime), inherits(P25519, MPrime), P25519.prototype.imulK = function (t) {
            for (var r = 0, i = 0; i < t.length; i++) {
                var s = 19 * t.words[i] + r, n = 67108863 & s;
                s >>>= 26, t.words[i] = n, r = s
            }
            return 0 !== r && (t.words[t.length++] = r), t
        }, BN._prime = function t(r) {
            if (primes[r])return primes[r];
            var t;
            if ("k256" === r)t = new K256; else if ("p224" === r)t = new P224; else if ("p192" === r)t = new P192; else {
                if ("p25519" !== r)throw new Error("Unknown prime " + r);
                t = new P25519
            }
            return primes[r] = t, t
        }, Red.prototype._verify1 = function (t) {
            assert(!t.sign, "red works only with positives"), assert(t.red, "red works only with red numbers")
        }, Red.prototype._verify2 = function (t, r) {
            assert(!t.sign && !r.sign, "red works only with positives"), assert(t.red && t.red === r.red, "red works only with red numbers")
        }, Red.prototype.imod = function (t) {
            return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.mod(this.m)._forceRed(this)
        }, Red.prototype.neg = function (t) {
            var r = t.clone();
            return r.sign = !r.sign, r.iadd(this.m)._forceRed(this)
        }, Red.prototype.add = function (t, r) {
            this._verify2(t, r);
            var i = t.add(r);
            return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
        }, Red.prototype.iadd = function (t, r) {
            this._verify2(t, r);
            var i = t.iadd(r);
            return i.cmp(this.m) >= 0 && i.isub(this.m), i
        }, Red.prototype.sub = function (t, r) {
            this._verify2(t, r);
            var i = t.sub(r);
            return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
        }, Red.prototype.isub = function (t, r) {
            this._verify2(t, r);
            var i = t.isub(r);
            return i.cmpn(0) < 0 && i.iadd(this.m), i
        }, Red.prototype.shl = function (t, r) {
            return this._verify1(t), this.imod(t.shln(r))
        }, Red.prototype.imul = function (t, r) {
            return this._verify2(t, r), this.imod(t.imul(r))
        }, Red.prototype.mul = function (t, r) {
            return this._verify2(t, r), this.imod(t.mul(r))
        }, Red.prototype.isqr = function (t) {
            return this.imul(t, t)
        }, Red.prototype.sqr = function (t) {
            return this.mul(t, t)
        }, Red.prototype.sqrt = function (t) {
            if (0 === t.cmpn(0))return t.clone();
            var r = this.m.andln(3);
            if (assert(r % 2 === 1), 3 === r) {
                var i = this.m.add(new BN(1)).ishrn(2), s = this.pow(t, i);
                return s
            }
            for (var n = this.m.subn(1), e = 0; 0 !== n.cmpn(0) && 0 === n.andln(1);)e++, n.ishrn(1);
            assert(0 !== n.cmpn(0));
            var h = new BN(1).toRed(this), o = h.redNeg(), f = this.m.subn(1).ishrn(1), d = this.m.bitLength();
            for (d = new BN(2 * d * d).toRed(this); 0 !== this.pow(d, f).cmp(o);)d.redIAdd(o);
            for (var u = this.pow(d, n), s = this.pow(t, n.addn(1).ishrn(1)), l = this.pow(t, n), p = e; 0 !== l.cmp(h);) {
                for (var a = l, g = 0; 0 !== a.cmp(h); g++)a = a.redSqr();
                assert(p > g);
                var m = this.pow(u, new BN(1).ishln(p - g - 1));
                s = s.redMul(m), u = m.redSqr(), l = l.redMul(u), p = g
            }
            return s
        }, Red.prototype.invm = function (t) {
            var r = t._egcd(new BN(1), this.m);
            return r.sign ? (r.sign = !1, this.imod(r).redNeg()) : this.imod(r)
        }, Red.prototype.pow = function (t, r) {
            for (var i = [], s = r.clone(); 0 !== s.cmpn(0);)i.push(s.andln(1)), s.ishrn(1);
            for (var n = t, e = 0; e < i.length && 0 === i[e]; e++, n = this.sqr(n));
            if (++e < i.length)for (var s = this.sqr(n); e < i.length; e++, s = this.sqr(s))0 !== i[e] && (n = this.mul(n, s));
            return n
        }, Red.prototype.convertTo = function (t) {
            return t.clone()
        }, Red.prototype.convertFrom = function (t) {
            var r = t.clone();
            return r.red = null, r
        }, BN.mont = function (t) {
            return new Mont(t)
        }, inherits(Mont, Red), Mont.prototype.convertTo = function (t) {
            return this.imod(t.shln(this.shift))
        }, Mont.prototype.convertFrom = function (t) {
            var r = this.imod(t.mul(this.rinv));
            return r.red = null, r
        }, Mont.prototype.imul = function (t, r) {
            if (0 === t.cmpn(0) || 0 === r.cmpn(0))return t.words[0] = 0, t.length = 1, t;
            var i = t.imul(r), s = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = i.isub(s).ishrn(this.shift), e = n;
            return n.cmp(this.m) >= 0 ? e = n.isub(this.m) : n.cmpn(0) < 0 && (e = n.iadd(this.m)), e._forceRed(this)
        }, Mont.prototype.mul = function (t, r) {
            if (0 === t.cmpn(0) || 0 === r.cmpn(0))return new BN(0)._forceRed(this);
            var i = t.mul(r), s = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = i.isub(s).ishrn(this.shift), e = n;
            return n.cmp(this.m) >= 0 ? e = n.isub(this.m) : n.cmpn(0) < 0 && (e = n.iadd(this.m)), e._forceRed(this)
        }, Mont.prototype.invm = function (t) {
            var r = this.imod(t.invm(this.m).mul(this.r2));
            return r._forceRed(this)
        };
    }, {}],
    130: [function (require, module, exports) {
        var hash = exports;
        hash.utils = require("./hash/utils"), hash.common = require("./hash/common"), hash.sha = require("./hash/sha"), hash.ripemd = require("./hash/ripemd"), hash.hmac = require("./hash/hmac"), hash.sha256 = hash.sha.sha256, hash.sha224 = hash.sha.sha224, hash.ripemd160 = hash.ripemd.ripemd160;
    }, {"./hash/common": 131, "./hash/hmac": 132, "./hash/ripemd": 133, "./hash/sha": 134, "./hash/utils": 135}],
    131: [function (require, module, exports) {
        function BlockHash() {
            this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.endian = "big"
        }

        var hash = require("../hash"), utils = hash.utils, assert = utils.assert;
        exports.BlockHash = BlockHash, BlockHash.prototype.update = function (t, i) {
            if (t = utils.toArray(t, i), this.pending = this.pending ? this.pending.concat(t) : t, this.pendingTotal += t.length, this.pending.length >= this.blockSize / 8) {
                t = this.pending;
                var n = t.length % (this.blockSize / 8);
                this.pending = t.slice(t.length - n, t.length), 0 === this.pending.length && (this.pending = null), t = utils.join32(t.slice(0, t.length - n), this.endian);
                for (var s = 0; s < t.length; s += this.blockSize / 32)this._update(t.slice(s, s + this.blockSize / 32))
            }
            return this
        }, BlockHash.prototype.digest = function (t) {
            return this.update(this._pad()), assert(null === this.pending), this._digest(t)
        }, BlockHash.prototype._pad = function () {
            var t = this.pendingTotal, i = this.blockSize / 8, n = i - (t + 8) % i, s = new Array(n + 8);
            s[0] = 128;
            for (var e = 1; n > e; e++)s[e] = 0;
            return t <<= 3, "big" === this.endian ? (s[e++] = 0, s[e++] = 0, s[e++] = 0, s[e++] = 0, s[e++] = t >>> 24 & 255, s[e++] = t >>> 16 & 255, s[e++] = t >>> 8 & 255, s[e++] = 255 & t) : (s[e++] = 255 & t, s[e++] = t >>> 8 & 255, s[e++] = t >>> 16 & 255, s[e++] = t >>> 24 & 255, s[e++] = 0, s[e++] = 0, s[e++] = 0, s[e++] = 0), s
        };
    }, {"../hash": 130}],
    132: [function (require, module, exports) {
        function Hmac(t, s, e) {
            return this instanceof Hmac ? (this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, void this._init(utils.toArray(s, e))) : new Hmac(t, s, e)
        }

        var hmac = exports, hash = require("../hash"), utils = hash.utils, assert = utils.assert;
        module.exports = Hmac, Hmac.prototype._init = function (t) {
            t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), assert(t.length <= this.blockSize);
            for (var s = t.length; s < this.blockSize; s++)t.push(0);
            for (var e = t.slice(), s = 0; s < t.length; s++)t[s] ^= 54, e[s] ^= 92;
            this.hash = {inner: (new this.Hash).update(t), outer: (new this.Hash).update(e)}
        }, Hmac.prototype.update = function (t, s) {
            return this.hash.inner.update(t, s), this
        }, Hmac.prototype.digest = function (t) {
            return this.hash.outer.update(this.hash.inner.digest()), this.hash.outer.digest(t)
        };
    }, {"../hash": 130}],
    133: [function (require, module, exports) {
        function RIPEMD160() {
            return this instanceof RIPEMD160 ? (BlockHash.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], void(this.endian = "little")) : new RIPEMD160
        }

        function f(t, s, h, i) {
            return 15 >= t ? s ^ h ^ i : 31 >= t ? s & h | ~s & i : 47 >= t ? (s | ~h) ^ i : 63 >= t ? s & i | h & ~i : s ^ (h | ~i)
        }

        function K(t) {
            return 15 >= t ? 0 : 31 >= t ? 1518500249 : 47 >= t ? 1859775393 : 63 >= t ? 2400959708 : 2840853838
        }

        function Kh(t) {
            return 15 >= t ? 1352829926 : 31 >= t ? 1548603684 : 47 >= t ? 1836072691 : 63 >= t ? 2053994217 : 0
        }

        var hash = require("../hash"), utils = hash.utils, rotl32 = utils.rotl32, sum32 = utils.sum32, sum32_3 = utils.sum32_3, sum32_4 = utils.sum32_4, BlockHash = hash.common.BlockHash;
        utils.inherits(RIPEMD160, BlockHash), exports.ripemd160 = RIPEMD160, RIPEMD160.blockSize = 512, RIPEMD160.outSize = 160, RIPEMD160.hmacStrength = 192, RIPEMD160.prototype._update = function (t) {
            for (var h = this.h[0], i = this.h[1], u = this.h[2], l = this.h[3], o = this.h[4], e = h, n = i, m = u, a = l, c = o, _ = 0; 80 > _; _++) {
                var D = sum32(rotl32(sum32_4(h, f(_, i, u, l), t[r[_]], K(_)), s[_]), o);
                h = o, o = l, l = rotl32(u, 10), u = i, i = D, D = sum32(rotl32(sum32_4(e, f(79 - _, n, m, a), t[rh[_]], Kh(_)), sh[_]), c), e = c, c = a, a = rotl32(m, 10), m = n, n = D
            }
            D = sum32_3(this.h[1], u, a), this.h[1] = sum32_3(this.h[2], l, c), this.h[2] = sum32_3(this.h[3], o, e), this.h[3] = sum32_3(this.h[4], h, n), this.h[4] = sum32_3(this.h[0], i, m), this.h[0] = D
        }, RIPEMD160.prototype._digest = function (t) {
            return "hex" === t ? utils.toHex32(this.h, "little") : utils.split32(this.h, "little")
        };
        var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], rh = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], sh = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
    }, {"../hash": 130}],
    134: [function (require, module, exports) {
        function SHA256() {
            return this instanceof SHA256 ? (BlockHash.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], void(this.k = sha256_K)) : new SHA256
        }

        function SHA224() {
            return this instanceof SHA224 ? (SHA256.call(this), void(this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])) : new SHA224
        }

        function ch32(t, s, h) {
            return t & s ^ ~t & h
        }

        function maj32(t, s, h) {
            return t & s ^ t & h ^ s & h
        }

        function s0_256(t) {
            return rotr32(t, 2) ^ rotr32(t, 13) ^ rotr32(t, 22)
        }

        function s1_256(t) {
            return rotr32(t, 6) ^ rotr32(t, 11) ^ rotr32(t, 25)
        }

        function g0_256(t) {
            return rotr32(t, 7) ^ rotr32(t, 18) ^ t >>> 3
        }

        function g1_256(t) {
            return rotr32(t, 17) ^ rotr32(t, 19) ^ t >>> 10
        }

        var hash = require("../hash"), utils = hash.utils, assert = utils.assert, rotr32 = utils.rotr32, rotl32 = utils.rotl32, sum32 = utils.sum32, sum32_4 = utils.sum32_4, sum32_5 = utils.sum32_5, BlockHash = hash.common.BlockHash, sha256_K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        utils.inherits(SHA256, BlockHash), exports.sha256 = SHA256, SHA256.blockSize = 512, SHA256.outSize = 256, SHA256.hmacStrength = 192, SHA256.prototype._update = function (t) {
            for (var s = new Array(64), h = 0; 16 > h; h++)s[h] = t[h];
            for (; h < s.length; h++)s[h] = sum32_4(g1_256(s[h - 2]), s[h - 7], g0_256(s[h - 15]), s[h - 16]);
            var i = this.h[0], r = this.h[1], u = this.h[2], o = this.h[3], n = this.h[4], e = this.h[5], l = this.h[6], a = this.h[7];
            assert(this.k.length === s.length);
            for (var h = 0; h < s.length; h++) {
                var c = sum32_5(a, s1_256(n), ch32(n, e, l), this.k[h], s[h]), H = sum32(s0_256(i), maj32(i, r, u));
                a = l, l = e, e = n, n = sum32(o, c), o = u, u = r, r = i, i = sum32(c, H)
            }
            this.h[0] = sum32(this.h[0], i), this.h[1] = sum32(this.h[1], r), this.h[2] = sum32(this.h[2], u), this.h[3] = sum32(this.h[3], o), this.h[4] = sum32(this.h[4], n), this.h[5] = sum32(this.h[5], e), this.h[6] = sum32(this.h[6], l), this.h[7] = sum32(this.h[7], a)
        }, SHA256.prototype._digest = function (t) {
            return "hex" === t ? utils.toHex32(this.h, "big") : utils.split32(this.h, "big")
        }, utils.inherits(SHA224, SHA256), exports.sha224 = SHA224, SHA224.blockSize = 512, SHA224.outSize = 224, SHA224.hmacStrength = 192, SHA224.prototype._digest = function (t) {
            return "hex" === t ? utils.toHex32(this.h.slice(0, 7), "big") : utils.split32(this.h.slice(0, 7), "big")
        };
    }, {"../hash": 130}],
    135: [function (require, module, exports) {
        function toArray(t, r) {
            if (Array.isArray(t))return t.slice();
            if (!t)return [];
            var e = [];
            if ("string" == typeof t)if (r) {
                if ("hex" === r) {
                    t = t.replace(/[^a-z0-9]+/gi, ""), t.length % 2 != 0 && (t = "0" + t);
                    for (var n = 0; n < t.length; n += 2)e.push(parseInt(t[n] + t[n + 1], 16))
                }
            } else for (var n = 0; n < t.length; n++) {
                var o = t.charCodeAt(n), u = o >> 8, i = 255 & o;
                u ? e.push(u, i) : e.push(i)
            } else for (var n = 0; n < t.length; n++)e[n] = 0 | t[n];
            return e
        }

        function toHex(t) {
            for (var r = "", e = 0; e < t.length; e++)r += zero2(t[e].toString(16));
            return r
        }

        function toHex32(t, r) {
            for (var e = "", n = 0; n < t.length; n++) {
                var o = t[n];
                "little" === r && (o = o >>> 24 | o >>> 8 & 65280 | o << 8 & 16711680 | (255 & o) << 24, 0 > o && (o += 4294967296)), e += zero8(o.toString(16))
            }
            return e
        }

        function zero2(t) {
            return 1 === t.length ? "0" + t : t
        }

        function zero8(t) {
            return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ? "0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t : t
        }

        function join32(t, r) {
            assert(t.length % 4 === 0);
            for (var e = new Array(t.length / 4), n = 0, o = 0; n < e.length; n++, o += 4) {
                var u;
                u = "big" === r ? t[o] << 24 | t[o + 1] << 16 | t[o + 2] << 8 | t[o + 3] : t[o + 3] << 24 | t[o + 2] << 16 | t[o + 1] << 8 | t[o], 0 > u && (u += 4294967296), e[n] = u
            }
            return e
        }

        function split32(t, r) {
            for (var e = new Array(4 * t.length), n = 0, o = 0; n < t.length; n++, o += 4) {
                var u = t[n];
                "big" === r ? (e[o] = u >>> 24, e[o + 1] = u >>> 16 & 255, e[o + 2] = u >>> 8 & 255, e[o + 3] = 255 & u) : (e[o + 3] = u >>> 24, e[o + 2] = u >>> 16 & 255, e[o + 1] = u >>> 8 & 255, e[o] = 255 & u)
            }
            return e
        }

        function rotr32(t, r) {
            return t >>> r | t << 32 - r
        }

        function rotl32(t, r) {
            return t << r | t >>> 32 - r
        }

        function sum32(t, r) {
            var e = t + r & 4294967295;
            return 0 > e && (e += 4294967296), e
        }

        function sum32_3(t, r, e) {
            var n = t + r + e & 4294967295;
            return 0 > n && (n += 4294967296), n
        }

        function sum32_4(t, r, e, n) {
            var o = t + r + e + n & 4294967295;
            return 0 > o && (o += 4294967296), o
        }

        function sum32_5(t, r, e, n, o) {
            var u = t + r + e + n + o & 4294967295;
            return 0 > u && (u += 4294967296), u
        }

        function assert(t, r) {
            if (!t)throw new Error(r || "Assertion failed")
        }

        var utils = exports;
        utils.toArray = toArray, utils.toHex = toHex, utils.toHex32 = toHex32, utils.zero2 = zero2, utils.zero8 = zero8, utils.join32 = join32, utils.split32 = split32, utils.rotr32 = rotr32, utils.rotl32 = rotl32, utils.sum32 = sum32, utils.sum32_3 = sum32_3, utils.sum32_4 = sum32_4, utils.sum32_5 = sum32_5, utils.assert = assert, utils.inherits = "function" == typeof Object.create ? function (t, r) {
            t.super_ = r, t.prototype = Object.create(r.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : function (t, r) {
            t.super_ = r;
            var e = function () {
            };
            e.prototype = r.prototype, t.prototype = new e, t.prototype.constructor = t
        };
    }, {}],
    136: [function (require, module, exports) {
        module.exports = require(94)
    }, {}],
    137: [function (require, module, exports) {
        module.exports = {
            "name": "elliptic",
            "version": "0.15.7",
            "description": "EC cryptography",
            "main": "lib/elliptic.js",
            "scripts": {
                "test": "mocha --reporter=spec test/*-test.js"
            },
            "repository": {
                "type": "git",
                "url": "git@github.com:indutny/elliptic"
            },
            "keywords": [
                "EC",
                "Elliptic",
                "curve",
                "Cryptography"
            ],
            "author": {
                "name": "Fedor Indutny",
                "email": "fedor@indutny.com"
            },
            "license": "MIT",
            "bugs": {
                "url": "https://github.com/indutny/elliptic/issues"
            },
            "homepage": "https://github.com/indutny/elliptic",
            "devDependencies": {
                "browserify": "^3.44.2",
                "mocha": "^1.18.2"
            },
            "dependencies": {
                "bn.js": "^0.11.6",
                "hash.js": "^0.2.0",
                "inherits": "^2.0.1",
                "uglify-js": "^2.4.13"
            },
            "_id": "elliptic@0.15.7",
            "_shasum": "33a3cfb88eeeeb04f0bbd06040f2cfc2fba93d2a",
            "_from": "elliptic@=0.15.7",
            "_npmVersion": "1.4.9",
            "_npmUser": {
                "name": "indutny",
                "email": "fedor@indutny.com"
            },
            "maintainers": [
                {
                    "name": "indutny",
                    "email": "fedor@indutny.com"
                }
            ],
            "dist": {
                "shasum": "33a3cfb88eeeeb04f0bbd06040f2cfc2fba93d2a",
                "tarball": "http://registry.npmjs.org/elliptic/-/elliptic-0.15.7.tgz"
            },
            "directories": {},
            "_resolved": "https://registry.npmjs.org/elliptic/-/elliptic-0.15.7.tgz",
            "readme": "ERROR: No README data found!"
        }

    }, {}],
    138: [function (require, module, exports) {
        var hash = exports;
        hash.utils = require("./hash/utils"), hash.common = require("./hash/common"), hash.sha = require("./hash/sha"), hash.ripemd = require("./hash/ripemd"), hash.hmac = require("./hash/hmac"), hash.sha1 = hash.sha.sha1, hash.sha256 = hash.sha.sha256, hash.sha224 = hash.sha.sha224, hash.ripemd160 = hash.ripemd.ripemd160;
    }, {"./hash/common": 139, "./hash/hmac": 140, "./hash/ripemd": 141, "./hash/sha": 142, "./hash/utils": 143}],
    139: [function (require, module, exports) {
        arguments[4][131][0].apply(exports, arguments)
    }, {"../hash": 138}],
    140: [function (require, module, exports) {
        arguments[4][132][0].apply(exports, arguments)
    }, {"../hash": 138}],
    141: [function (require, module, exports) {
        arguments[4][133][0].apply(exports, arguments)
    }, {"../hash": 138}],
    142: [function (require, module, exports) {
        function SHA256() {
            return this instanceof SHA256 ? (BlockHash.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], void(this.k = sha256_K)) : new SHA256
        }

        function SHA224() {
            return this instanceof SHA224 ? (SHA256.call(this), void(this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])) : new SHA224
        }

        function SHA1() {
            return this instanceof SHA1 ? (BlockHash.call(this), void(this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520])) : new SHA1
        }

        function ch32(t, h, s) {
            return t & h ^ ~t & s
        }

        function maj32(t, h, s) {
            return t & h ^ t & s ^ h & s
        }

        function p32(t, h, s) {
            return t ^ h ^ s
        }

        function s0_256(t) {
            return rotr32(t, 2) ^ rotr32(t, 13) ^ rotr32(t, 22)
        }

        function s1_256(t) {
            return rotr32(t, 6) ^ rotr32(t, 11) ^ rotr32(t, 25)
        }

        function g0_256(t) {
            return rotr32(t, 7) ^ rotr32(t, 18) ^ t >>> 3
        }

        function g1_256(t) {
            return rotr32(t, 17) ^ rotr32(t, 19) ^ t >>> 10
        }

        function ft_1(t, h, s, i) {
            return 0 === t ? ch32(h, s, i) : 1 === t || 3 === t ? p32(h, s, i) : 2 === t ? maj32(h, s, i) : void 0
        }

        var hash = require("../hash"), utils = hash.utils, assert = utils.assert, rotr32 = utils.rotr32, rotl32 = utils.rotl32, sum32 = utils.sum32, sum32_4 = utils.sum32_4, sum32_5 = utils.sum32_5, BlockHash = hash.common.BlockHash, sha256_K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], sha1_K = [1518500249, 1859775393, 2400959708, 3395469782];
        utils.inherits(SHA256, BlockHash), exports.sha256 = SHA256, SHA256.blockSize = 512, SHA256.outSize = 256, SHA256.hmacStrength = 192, SHA256.prototype._update = function (t) {
            for (var h = new Array(64), s = 0; 16 > s; s++)h[s] = t[s];
            for (; s < h.length; s++)h[s] = sum32_4(g1_256(h[s - 2]), h[s - 7], g0_256(h[s - 15]), h[s - 16]);
            var i = this.h[0], r = this.h[1], u = this.h[2], o = this.h[3], n = this.h[4], e = this.h[5], l = this.h[6], a = this.h[7];
            assert(this.k.length === h.length);
            for (var s = 0; s < h.length; s++) {
                var c = sum32_5(a, s1_256(n), ch32(n, e, l), this.k[s], h[s]), H = sum32(s0_256(i), maj32(i, r, u));
                a = l, l = e, e = n, n = sum32(o, c), o = u, u = r, r = i, i = sum32(c, H)
            }
            this.h[0] = sum32(this.h[0], i), this.h[1] = sum32(this.h[1], r), this.h[2] = sum32(this.h[2], u), this.h[3] = sum32(this.h[3], o), this.h[4] = sum32(this.h[4], n), this.h[5] = sum32(this.h[5], e), this.h[6] = sum32(this.h[6], l), this.h[7] = sum32(this.h[7], a)
        }, SHA256.prototype._digest = function (t) {
            return "hex" === t ? utils.toHex32(this.h, "big") : utils.split32(this.h, "big")
        }, utils.inherits(SHA224, SHA256), exports.sha224 = SHA224, SHA224.blockSize = 512, SHA224.outSize = 224, SHA224.hmacStrength = 192, SHA224.prototype._digest = function (t) {
            return "hex" === t ? utils.toHex32(this.h.slice(0, 7), "big") : utils.split32(this.h.slice(0, 7), "big")
        }, utils.inherits(SHA1, BlockHash), exports.sha1 = SHA1, SHA1.blockSize = 512, SHA1.outSize = 160, SHA1.hmacStrength = 80, SHA1.prototype._update = function (t) {
            for (var h = Array(80), s = 0; 16 > s; s++)h[s] = t[s];
            for (; s < h.length; s++)h[s] = rotl32(h[s - 3] ^ h[s - 8] ^ h[s - 14] ^ h[s - 16], 1);
            for (var i = this.h[0], r = this.h[1], u = this.h[2], o = this.h[3], n = this.h[4], s = 0; s < h.length; s++) {
                var e = ~~(s / 20), l = sum32_5(rotl32(i, 5), ft_1(e, r, u, o), n, h[s], sha1_K[e]);
                n = o, o = u, u = rotl32(r, 30), r = i, i = l
            }
            this.h[0] = sum32(this.h[0], i), this.h[1] = sum32(this.h[1], r), this.h[2] = sum32(this.h[2], u), this.h[3] = sum32(this.h[3], o), this.h[4] = sum32(this.h[4], n)
        }, SHA1.prototype._digest = function (t) {
            return "hex" === t ? utils.toHex32(this.h, "big") : utils.split32(this.h, "big")
        };
    }, {"../hash": 138}],
    143: [function (require, module, exports) {
        function toArray(r, t) {
            if (Array.isArray(r))return r.slice();
            if (!r)return [];
            var n = [];
            if ("string" == typeof r)if (t) {
                if ("hex" === t) {
                    r = r.replace(/[^a-z0-9]+/gi, ""), r.length % 2 != 0 && (r = "0" + r);
                    for (var e = 0; e < r.length; e += 2)n.push(parseInt(r[e] + r[e + 1], 16))
                }
            } else for (var e = 0; e < r.length; e++) {
                var i = r.charCodeAt(e), u = i >> 8, o = 255 & i;
                u ? n.push(u, o) : n.push(o)
            } else for (var e = 0; e < r.length; e++)n[e] = 0 | r[e];
            return n
        }

        function toHex(r) {
            for (var t = "", n = 0; n < r.length; n++)t += zero2(r[n].toString(16));
            return t
        }

        function toHex32(r, t) {
            for (var n = "", e = 0; e < r.length; e++) {
                var i = r[e];
                "little" === t && (i = i >>> 24 | i >>> 8 & 65280 | i << 8 & 16711680 | (255 & i) << 24, 0 > i && (i += 4294967296)), n += zero8(i.toString(16))
            }
            return n
        }

        function zero2(r) {
            return 1 === r.length ? "0" + r : r
        }

        function zero8(r) {
            return 7 === r.length ? "0" + r : 6 === r.length ? "00" + r : 5 === r.length ? "000" + r : 4 === r.length ? "0000" + r : 3 === r.length ? "00000" + r : 2 === r.length ? "000000" + r : 1 === r.length ? "0000000" + r : r
        }

        function join32(r, t) {
            assert(r.length % 4 === 0);
            for (var n = new Array(r.length / 4), e = 0, i = 0; e < n.length; e++, i += 4) {
                var u;
                u = "big" === t ? r[i] << 24 | r[i + 1] << 16 | r[i + 2] << 8 | r[i + 3] : r[i + 3] << 24 | r[i + 2] << 16 | r[i + 1] << 8 | r[i], 0 > u && (u += 4294967296), n[e] = u
            }
            return n
        }

        function split32(r, t) {
            for (var n = new Array(4 * r.length), e = 0, i = 0; e < r.length; e++, i += 4) {
                var u = r[e];
                "big" === t ? (n[i] = u >>> 24, n[i + 1] = u >>> 16 & 255, n[i + 2] = u >>> 8 & 255, n[i + 3] = 255 & u) : (n[i + 3] = u >>> 24, n[i + 2] = u >>> 16 & 255, n[i + 1] = u >>> 8 & 255, n[i] = 255 & u)
            }
            return n
        }

        function rotr32(r, t) {
            return r >>> t | r << 32 - t
        }

        function rotl32(r, t) {
            return r << t | r >>> 32 - t
        }

        function sum32(r, t) {
            var n = r + t & 4294967295;
            return 0 > n && (n += 4294967296), n
        }

        function sum32_3(r, t, n) {
            var e = r + t + n & 4294967295;
            return 0 > e && (e += 4294967296), e
        }

        function sum32_4(r, t, n, e) {
            var i = r + t + n + e & 4294967295;
            return 0 > i && (i += 4294967296), i
        }

        function sum32_5(r, t, n, e, i) {
            var u = r + t + n + e + i & 4294967295;
            return 0 > u && (u += 4294967296), u
        }

        function assert(r, t) {
            if (!r)throw new Error(t || "Assertion failed")
        }

        var utils = exports, inherits = require("inherits");
        utils.toArray = toArray, utils.toHex = toHex, utils.toHex32 = toHex32, utils.zero2 = zero2, utils.zero8 = zero8, utils.join32 = join32, utils.split32 = split32, utils.rotr32 = rotr32, utils.rotl32 = rotl32, utils.sum32 = sum32, utils.sum32_3 = sum32_3, utils.sum32_4 = sum32_4, utils.sum32_5 = sum32_5, utils.assert = assert, utils.inherits = inherits;
    }, {"inherits": 144}],
    144: [function (require, module, exports) {
        module.exports = require(94)
    }, {}],
    145: [function (require, module, exports) {
        module.exports = require("./src/preconditions");
    }, {"./src/preconditions": 148}],
    146: [function (require, module, exports) {
        (function () {
            var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, g = e.filter, d = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, w = Object.keys, _ = i.bind, j = function (n) {
                return n instanceof j ? n : this instanceof j ? void(this._wrapped = n) : new j(n)
            };
            "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.6.0";
            var A = j.each = j.forEach = function (n, t, e) {
                if (null == n)return n;
                if (s && n.forEach === s)n.forEach(t, e); else if (n.length === +n.length) {
                    for (var u = 0, i = n.length; i > u; u++)if (t.call(e, n[u], u, n) === r)return
                } else for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)if (t.call(e, n[a[u]], a[u], n) === r)return;
                return n
            };
            j.map = j.collect = function (n, t, r) {
                var e = [];
                return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function (n, u, i) {
                    e.push(t.call(r, n, u, i))
                }), e)
            };
            var O = "Reduce of empty array with no initial value";
            j.reduce = j.foldl = j.inject = function (n, t, r, e) {
                var u = arguments.length > 2;
                if (null == n && (n = []), h && n.reduce === h)return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
                if (A(n, function (n, i, a) {
                        u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
                    }), !u)throw new TypeError(O);
                return r
            }, j.reduceRight = j.foldr = function (n, t, r, e) {
                var u = arguments.length > 2;
                if (null == n && (n = []), v && n.reduceRight === v)return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
                var i = n.length;
                if (i !== +i) {
                    var a = j.keys(n);
                    i = a.length
                }
                if (A(n, function (o, c, l) {
                        c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
                    }), !u)throw new TypeError(O);
                return r
            }, j.find = j.detect = function (n, t, r) {
                var e;
                return k(n, function (n, u, i) {
                    return t.call(r, n, u, i) ? (e = n, !0) : void 0
                }), e
            }, j.filter = j.select = function (n, t, r) {
                var e = [];
                return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function (n, u, i) {
                    t.call(r, n, u, i) && e.push(n)
                }), e)
            }, j.reject = function (n, t, r) {
                return j.filter(n, function (n, e, u) {
                    return !t.call(r, n, e, u)
                }, r)
            }, j.every = j.all = function (n, t, e) {
                t || (t = j.identity);
                var u = !0;
                return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function (n, i, a) {
                    return (u = u && t.call(e, n, i, a)) ? void 0 : r
                }), !!u)
            };
            var k = j.some = j.any = function (n, t, e) {
                t || (t = j.identity);
                var u = !1;
                return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function (n, i, a) {
                    return u || (u = t.call(e, n, i, a)) ? r : void 0
                }), !!u)
            };
            j.contains = j.include = function (n, t) {
                return null == n ? !1 : y && n.indexOf === y ? -1 != n.indexOf(t) : k(n, function (n) {
                    return n === t
                })
            }, j.invoke = function (n, t) {
                var r = o.call(arguments, 2), e = j.isFunction(t);
                return j.map(n, function (n) {
                    return (e ? t : n[t]).apply(n, r)
                })
            }, j.pluck = function (n, t) {
                return j.map(n, j.property(t))
            }, j.where = function (n, t) {
                return j.filter(n, j.matches(t))
            }, j.findWhere = function (n, t) {
                return j.find(n, j.matches(t))
            }, j.max = function (n, t, r) {
                if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)return Math.max.apply(Math, n);
                var e = -1 / 0, u = -1 / 0;
                return A(n, function (n, i, a) {
                    var o = t ? t.call(r, n, i, a) : n;
                    o > u && (e = n, u = o)
                }), e
            }, j.min = function (n, t, r) {
                if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)return Math.min.apply(Math, n);
                var e = 1 / 0, u = 1 / 0;
                return A(n, function (n, i, a) {
                    var o = t ? t.call(r, n, i, a) : n;
                    u > o && (e = n, u = o)
                }), e
            }, j.shuffle = function (n) {
                var t, r = 0, e = [];
                return A(n, function (n) {
                    t = j.random(r++), e[r - 1] = e[t], e[t] = n
                }), e
            }, j.sample = function (n, t, r) {
                return null == t || r ? (n.length !== +n.length && (n = j.values(n)), n[j.random(n.length - 1)]) : j.shuffle(n).slice(0, Math.max(0, t))
            };
            var E = function (n) {
                return null == n ? j.identity : j.isFunction(n) ? n : j.property(n)
            };
            j.sortBy = function (n, t, r) {
                return t = E(t), j.pluck(j.map(n, function (n, e, u) {
                    return {value: n, index: e, criteria: t.call(r, n, e, u)}
                }).sort(function (n, t) {
                    var r = n.criteria, e = t.criteria;
                    if (r !== e) {
                        if (r > e || void 0 === r)return 1;
                        if (e > r || void 0 === e)return -1
                    }
                    return n.index - t.index
                }), "value")
            };
            var F = function (n) {
                return function (t, r, e) {
                    var u = {};
                    return r = E(r), A(t, function (i, a) {
                        var o = r.call(e, i, a, t);
                        n(u, o, i)
                    }), u
                }
            };
            j.groupBy = F(function (n, t, r) {
                j.has(n, t) ? n[t].push(r) : n[t] = [r]
            }), j.indexBy = F(function (n, t, r) {
                n[t] = r
            }), j.countBy = F(function (n, t) {
                j.has(n, t) ? n[t]++ : n[t] = 1
            }), j.sortedIndex = function (n, t, r, e) {
                r = E(r);
                for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
                    var o = i + a >>> 1;
                    r.call(e, n[o]) < u ? i = o + 1 : a = o
                }
                return i
            }, j.toArray = function (n) {
                return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
            }, j.size = function (n) {
                return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length
            }, j.first = j.head = j.take = function (n, t, r) {
                return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : o.call(n, 0, t)
            }, j.initial = function (n, t, r) {
                return o.call(n, 0, n.length - (null == t || r ? 1 : t))
            }, j.last = function (n, t, r) {
                return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
            }, j.rest = j.tail = j.drop = function (n, t, r) {
                return o.call(n, null == t || r ? 1 : t)
            }, j.compact = function (n) {
                return j.filter(n, j.identity)
            };
            var M = function (n, t, r) {
                return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function (n) {
                    j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n)
                }), r)
            };
            j.flatten = function (n, t) {
                return M(n, t, [])
            }, j.without = function (n) {
                return j.difference(n, o.call(arguments, 1))
            }, j.partition = function (n, t) {
                var r = [], e = [];
                return A(n, function (n) {
                    (t(n) ? r : e).push(n)
                }), [r, e]
            }, j.uniq = j.unique = function (n, t, r, e) {
                j.isFunction(t) && (e = r, r = t, t = !1);
                var u = r ? j.map(n, r, e) : n, i = [], a = [];
                return A(u, function (r, e) {
                    (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]))
                }), i
            }, j.union = function () {
                return j.uniq(j.flatten(arguments, !0))
            }, j.intersection = function (n) {
                var t = o.call(arguments, 1);
                return j.filter(j.uniq(n), function (n) {
                    return j.every(t, function (t) {
                        return j.contains(t, n)
                    })
                })
            }, j.difference = function (n) {
                var t = c.apply(e, o.call(arguments, 1));
                return j.filter(n, function (n) {
                    return !j.contains(t, n)
                })
            }, j.zip = function () {
                for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++)t[r] = j.pluck(arguments, "" + r);
                return t
            }, j.object = function (n, t) {
                if (null == n)return {};
                for (var r = {}, e = 0, u = n.length; u > e; e++)t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
                return r
            }, j.indexOf = function (n, t, r) {
                if (null == n)return -1;
                var e = 0, u = n.length;
                if (r) {
                    if ("number" != typeof r)return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
                    e = 0 > r ? Math.max(0, u + r) : r
                }
                if (y && n.indexOf === y)return n.indexOf(t, r);
                for (; u > e; e++)if (n[e] === t)return e;
                return -1
            }, j.lastIndexOf = function (n, t, r) {
                if (null == n)return -1;
                var e = null != r;
                if (b && n.lastIndexOf === b)return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
                for (var u = e ? r : n.length; u--;)if (n[u] === t)return u;
                return -1
            }, j.range = function (n, t, r) {
                arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
                for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;)i[u++] = n, n += r;
                return i
            };
            var R = function () {
            };
            j.bind = function (n, t) {
                var r, e;
                if (_ && n.bind === _)return _.apply(n, o.call(arguments, 1));
                if (!j.isFunction(n))throw new TypeError;
                return r = o.call(arguments, 2), e = function () {
                    if (!(this instanceof e))return n.apply(t, r.concat(o.call(arguments)));
                    R.prototype = n.prototype;
                    var u = new R;
                    R.prototype = null;
                    var i = n.apply(u, r.concat(o.call(arguments)));
                    return Object(i) === i ? i : u
                }
            }, j.partial = function (n) {
                var t = o.call(arguments, 1);
                return function () {
                    for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++)e[u] === j && (e[u] = arguments[r++]);
                    for (; r < arguments.length;)e.push(arguments[r++]);
                    return n.apply(this, e)
                }
            }, j.bindAll = function (n) {
                var t = o.call(arguments, 1);
                if (0 === t.length)throw new Error("bindAll must be passed function names");
                return A(t, function (t) {
                    n[t] = j.bind(n[t], n)
                }), n
            }, j.memoize = function (n, t) {
                var r = {};
                return t || (t = j.identity), function () {
                    var e = t.apply(this, arguments);
                    return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
                }
            }, j.delay = function (n, t) {
                var r = o.call(arguments, 2);
                return setTimeout(function () {
                    return n.apply(null, r)
                }, t)
            }, j.defer = function (n) {
                return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
            }, j.throttle = function (n, t, r) {
                var e, u, i, a = null, o = 0;
                r || (r = {});
                var c = function () {
                    o = r.leading === !1 ? 0 : j.now(), a = null, i = n.apply(e, u), e = u = null
                };
                return function () {
                    var l = j.now();
                    o || r.leading !== !1 || (o = l);
                    var f = t - (l - o);
                    return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u), e = u = null) : a || r.trailing === !1 || (a = setTimeout(c, f)), i
                }
            }, j.debounce = function (n, t, r) {
                var e, u, i, a, o, c = function () {
                    var l = j.now() - a;
                    t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u), i = u = null))
                };
                return function () {
                    i = this, u = arguments, a = j.now();
                    var l = r && !e;
                    return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u), i = u = null), o
                }
            }, j.once = function (n) {
                var t, r = !1;
                return function () {
                    return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
                }
            }, j.wrap = function (n, t) {
                return j.partial(t, n)
            }, j.compose = function () {
                var n = arguments;
                return function () {
                    for (var t = arguments, r = n.length - 1; r >= 0; r--)t = [n[r].apply(this, t)];
                    return t[0]
                }
            }, j.after = function (n, t) {
                return function () {
                    return --n < 1 ? t.apply(this, arguments) : void 0
                }
            }, j.keys = function (n) {
                if (!j.isObject(n))return [];
                if (w)return w(n);
                var t = [];
                for (var r in n)j.has(n, r) && t.push(r);
                return t
            }, j.values = function (n) {
                for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)e[u] = n[t[u]];
                return e
            }, j.pairs = function (n) {
                for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)e[u] = [t[u], n[t[u]]];
                return e
            }, j.invert = function (n) {
                for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++)t[n[r[e]]] = r[e];
                return t
            }, j.functions = j.methods = function (n) {
                var t = [];
                for (var r in n)j.isFunction(n[r]) && t.push(r);
                return t.sort()
            }, j.extend = function (n) {
                return A(o.call(arguments, 1), function (t) {
                    if (t)for (var r in t)n[r] = t[r]
                }), n
            }, j.pick = function (n) {
                var t = {}, r = c.apply(e, o.call(arguments, 1));
                return A(r, function (r) {
                    r in n && (t[r] = n[r])
                }), t
            }, j.omit = function (n) {
                var t = {}, r = c.apply(e, o.call(arguments, 1));
                for (var u in n)j.contains(r, u) || (t[u] = n[u]);
                return t
            }, j.defaults = function (n) {
                return A(o.call(arguments, 1), function (t) {
                    if (t)for (var r in t)void 0 === n[r] && (n[r] = t[r])
                }), n
            }, j.clone = function (n) {
                return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
            }, j.tap = function (n, t) {
                return t(n), n
            };
            var S = function (n, t, r, e) {
                if (n === t)return 0 !== n || 1 / n == 1 / t;
                if (null == n || null == t)return n === t;
                n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
                var u = l.call(n);
                if (u != l.call(t))return !1;
                switch (u) {
                    case"[object String]":
                        return n == String(t);
                    case"[object Number]":
                        return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
                    case"[object Date]":
                    case"[object Boolean]":
                        return +n == +t;
                    case"[object RegExp]":
                        return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
                }
                if ("object" != typeof n || "object" != typeof t)return !1;
                for (var i = r.length; i--;)if (r[i] == n)return e[i] == t;
                var a = n.constructor, o = t.constructor;
                if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o) && "constructor"in n && "constructor"in t)return !1;
                r.push(n), e.push(t);
                var c = 0, f = !0;
                if ("[object Array]" == u) {
                    if (c = n.length, f = c == t.length)for (; c-- && (f = S(n[c], t[c], r, e)););
                } else {
                    for (var s in n)if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e))))break;
                    if (f) {
                        for (s in t)if (j.has(t, s) && !c--)break;
                        f = !c
                    }
                }
                return r.pop(), e.pop(), f
            };
            j.isEqual = function (n, t) {
                return S(n, t, [], [])
            }, j.isEmpty = function (n) {
                if (null == n)return !0;
                if (j.isArray(n) || j.isString(n))return 0 === n.length;
                for (var t in n)if (j.has(n, t))return !1;
                return !0
            }, j.isElement = function (n) {
                return !(!n || 1 !== n.nodeType)
            }, j.isArray = x || function (n) {
                return "[object Array]" == l.call(n)
            }, j.isObject = function (n) {
                return n === Object(n)
            }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (n) {
                j["is" + n] = function (t) {
                    return l.call(t) == "[object " + n + "]"
                }
            }), j.isArguments(arguments) || (j.isArguments = function (n) {
                return !(!n || !j.has(n, "callee"))
            }), "function" != typeof/./ && (j.isFunction = function (n) {
                return "function" == typeof n
            }), j.isFinite = function (n) {
                return isFinite(n) && !isNaN(parseFloat(n))
            }, j.isNaN = function (n) {
                return j.isNumber(n) && n != +n
            }, j.isBoolean = function (n) {
                return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
            }, j.isNull = function (n) {
                return null === n
            }, j.isUndefined = function (n) {
                return void 0 === n
            }, j.has = function (n, t) {
                return f.call(n, t)
            }, j.noConflict = function () {
                return n._ = t, this
            }, j.identity = function (n) {
                return n
            }, j.constant = function (n) {
                return function () {
                    return n
                }
            }, j.property = function (n) {
                return function (t) {
                    return t[n]
                }
            }, j.matches = function (n) {
                return function (t) {
                    if (t === n)return !0;
                    for (var r in n)if (n[r] !== t[r])return !1;
                    return !0
                }
            }, j.times = function (n, t, r) {
                for (var e = Array(Math.max(0, n)), u = 0; n > u; u++)e[u] = t.call(r, u);
                return e
            }, j.random = function (n, t) {
                return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
            }, j.now = Date.now || function () {
                return (new Date).getTime()
            };
            var T = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
            T.unescape = j.invert(T.escape);
            var I = {
                escape: new RegExp("[" + j.keys(T.escape).join("") + "]", "g"),
                unescape: new RegExp("(" + j.keys(T.unescape).join("|") + ")", "g")
            };
            j.each(["escape", "unescape"], function (n) {
                j[n] = function (t) {
                    return null == t ? "" : ("" + t).replace(I[n], function (t) {
                        return T[n][t]
                    })
                }
            }), j.result = function (n, t) {
                if (null == n)return void 0;
                var r = n[t];
                return j.isFunction(r) ? r.call(n) : r
            }, j.mixin = function (n) {
                A(j.functions(n), function (t) {
                    var r = j[t] = n[t];
                    j.prototype[t] = function () {
                        var n = [this._wrapped];
                        return a.apply(n, arguments), z.call(this, r.apply(j, n))
                    }
                })
            };
            var N = 0;
            j.uniqueId = function (n) {
                var t = ++N + "";
                return n ? n + t : t
            }, j.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var q = /(.)^/, B = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
            j.template = function (n, t, r) {
                var e;
                r = j.defaults({}, r, j.templateSettings);
                var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"), i = 0, a = "__p+='";
                n.replace(u, function (t, r, e, u, o) {
                    return a += n.slice(i, o).replace(D, function (n) {
                        return "\\" + B[n]
                    }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
                }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
                try {
                    e = new Function(r.variable || "obj", "_", a)
                } catch (o) {
                    throw o.source = a, o
                }
                if (t)return e(t, j);
                var c = function (n) {
                    return e.call(this, n, j)
                };
                return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
            }, j.chain = function (n) {
                return j(n).chain()
            };
            var z = function (n) {
                return this._chain ? j(n).chain() : n
            };
            j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
                var t = e[n];
                j.prototype[n] = function () {
                    var r = this._wrapped;
                    return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r)
                }
            }), A(["concat", "join", "slice"], function (n) {
                var t = e[n];
                j.prototype[n] = function () {
                    return z.call(this, t.apply(this._wrapped, arguments))
                }
            }), j.extend(j.prototype, {
                chain: function () {
                    return this._chain = !0, this
                }, value: function () {
                    return this._wrapped
                }
            }), "function" == typeof define && define.amd && define("underscore", [], function () {
                return j
            })
        }).call(this);
    }, {}],
    147: [function (require, module, exports) {
        exports.ShouldBeDefined = "Variable should be defined.", exports.ShouldBeUndefined = "Variable should be undefined.", exports.ShouldBeArray = "Variable should be of type Array.", exports.ShouldNotBeArray = "Variable should NOT be of type Array.", exports.ShouldBeObject = "Variable should be of type Object.", exports.ShouldNotBeObject = "Variable should NOT be of type Object.", exports.ShouldBeEmpty = "Array or object should be empty.", exports.ShouldNotBeEmpty = "Array or object should NOT be empty.", exports.ShouldBeFunction = "Variable should be a Function.", exports.ShouldNotBeFunction = "Variable should NOT be a Function.", exports.ShouldBeString = "Variable should be a String.", exports.ShouldNotBeString = "Variable should NOT be a String.", exports.ShouldBeNumber = "Variable should be a Number.", exports.ShouldNotBeNumber = "Variable should NOT be a Number.", exports.ShouldBeFinite = "Variable should be Finite (i.e. not infinity).", exports.ShouldBeInfinite = "Variable should be Infinite.", exports.ShouldBeBoolean = "Variable should be a Boolean.", exports.ShouldNotBeBoolean = "Variable should NOT be a Boolean.", exports.ShouldBeDate = "Variable should be a Date.", exports.ShouldNotBeDate = "Variable should NOT be a Date.", exports.ShouldBeRegExp = "Variable should be a RegExp.", exports.ShouldNotBeRegExp = "Variable should NOT be a RegExp.", exports.ShouldBeFalsey = "Variable should be falsey.", exports.ShouldNotBeFalsey = "Variable should NOT be falsey.", exports.IllegalArgument = "Illegal Argument.", exports.IllegalState = "Illegal State.", exports.ShouldHaveValidIndex = "Index should be between between 0 (inclusive) and size (exclusive).", exports.ShouldHaveValidPosition = "Index should be between index between 0 (inclusive) and size (inclusive).", exports.ShouldHaveValidPositions = "Start and End should be between valid sub range between 0 (inclusive) and size (inclusive).", exports.StartBeforeEnd = "Start value should be less than the end value.";
    }, {}],
    148: [function (require, module, exports) {
        "use strict";
        function Preconditions(t) {
            this.out = t
        }

        var _ = require("underscore"), validatorFunctions = require("./validatorFunctions"), require = require("util");
        Preconditions.prototype.validate = function (t, o, n) {
            var i = t.split("."), e = this.out || {}, r = 0;
            for (var u in i) {
                var s = i[u];
                r !== i.length - 1 && validatorFunctions.shouldBeDefined(e[s], n), e = e[s], r++
            }
            o(e)
        }, Preconditions.prototype.shouldBeDefined = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeDefined(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeUndefined = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeUndefined(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeNonEmptyArray = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeArray(t, o), validatorFunctions.shouldNotBeEmpty(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeArray = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeArray(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeArray = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeArray(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeObject = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeObject(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeObject = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeObject(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeEmpty = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeEmpty(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeEmpty = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeEmpty(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeFunction = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeFunction(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeFunction = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeFunction(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeString = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeString(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeString = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeString(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeNumber = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeNumber(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeNumber = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeNumber(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeFinite = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeFinite(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeInfinite = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeInfinite(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeBoolean = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeBoolean(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeBoolean = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeBoolean(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeDate = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeDate(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeDate = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeDate(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeRegExp = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeRegExp(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeRegExp = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeRegExp(t, o)
            }, o), this
        }, Preconditions.prototype.shouldBeFalsey = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldBeFalsey(t, o)
            }, o), this
        }, Preconditions.prototype.shouldNotBeFalsey = function (t, o) {
            return this.validate(t, function (t) {
                validatorFunctions.shouldNotBeFalsey(t, o)
            }, o), this
        }, Preconditions.prototype.checkArgument = function (t, o) {
            return validatorFunctions.checkArgument(t, o), this
        }, Preconditions.prototype.checkState = function (t, o) {
            return validatorFunctions.checkState(t, o), this
        }, Preconditions.prototype.checkElementIndex = function (t, o, n) {
            return validatorFunctions.checkElementIndex(t, o, n), this
        }, Preconditions.prototype.checkPositionIndex = function (t, o, n) {
            return validatorFunctions.checkPositionIndex(t, o, n), this
        }, Preconditions.prototype.checkPositionIndexes = function (t, o, n, i) {
            return validatorFunctions.checkPositionIndexes(t, o, n, i), this
        }, module.exports = {
            instance: function (t) {
                return new Preconditions(t)
            }, constructor: function () {
                return Preconditions
            }, singleton: function () {
                return validatorFunctions
            }
        };
    }, {"./validatorFunctions": 149, "underscore": 146, "util": 111}],
    149: [function (require, module, exports) {
        "use strict";
        var constants = require("./constants"), _ = require("underscore"), validatorFunctions = {
            shouldBeDefined: function (t, r) {
                if (_.isUndefined(t)) {
                    var n = r || constants.ShouldBeDefined;
                    throw new Error(n)
                }
                return this
            }, shouldBeUndefined: function (t, r) {
                if (!_.isUndefined(t)) {
                    var n = r || constants.ShouldBeUndefined;
                    throw new Error(n)
                }
                return this
            }, shouldBeArray: function (t, r) {
                if (!_.isArray(t)) {
                    var n = r || constants.ShouldBeArray;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeArray: function (t, r) {
                if (_.isArray(t)) {
                    var n = r || constants.ShouldNotBeArray;
                    throw new Error(n)
                }
                return this
            }, shouldBeObject: function (t, r) {
                if (!_.isObject(t)) {
                    var n = r || constants.ShouldBeObject;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeObject: function (t, r) {
                if (_.isObject(t)) {
                    var n = r || constants.ShouldNotBeObject;
                    throw new Error(n)
                }
                return this
            }, shouldBeEmpty: function (t, r) {
                if (!_.isEmpty(t)) {
                    var n = r || constants.ShouldBeEmpty;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeEmpty: function (t, r) {
                if (_.isEmpty(t)) {
                    var n = r || constants.ShouldNotBeEmpty;
                    throw new Error(n)
                }
                return this
            }, shouldBeFunction: function (t, r) {
                if (!_.isFunction(t)) {
                    var n = r || constants.ShouldBeFunction;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeFunction: function (t, r) {
                if (_.isFunction(t)) {
                    var n = r || constants.ShouldNotBeFunction;
                    throw new Error(n)
                }
                return this
            }, shouldBeString: function (t, r) {
                if (!_.isString(t)) {
                    var n = r || constants.ShouldBeString;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeString: function (t, r) {
                if (_.isString(t)) {
                    var n = r || constants.ShouldNotBeString;
                    throw new Error(n)
                }
                return this
            }, shouldBeNumber: function (t, r) {
                if (!_.isNumber(t)) {
                    var n = r || constants.ShouldBeNumber;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeNumber: function (t, r) {
                if (console.log("val: " + t), _.isNumber(t)) {
                    var n = r || constants.ShouldNotBeNumber;
                    throw new Error(n)
                }
                return this
            }, shouldBeFinite: function (t, r) {
                if (!_.isFinite(t)) {
                    var n = r || constants.ShouldBeFinite;
                    throw new Error(n)
                }
                return this
            }, shouldBeInfinite: function (t, r) {
                if (_.isFinite(t)) {
                    var n = r || constants.ShouldBeInfinite;
                    throw new Error(n)
                }
                return this
            }, shouldBeBoolean: function (t, r) {
                if (!_.isBoolean(t)) {
                    var n = r || constants.ShouldBeBoolean;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeBoolean: function (t, r) {
                if (_.isBoolean(t)) {
                    var n = r || constants.ShouldNotBeBoolean;
                    throw new Error(n)
                }
                return this
            }, shouldBeDate: function (t, r) {
                if (!_.isDate(t)) {
                    var n = r || constants.ShouldBeDate;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeDate: function (t, r) {
                if (_.isDate(t)) {
                    var n = r || constants.ShouldNotBeDate;
                    throw new Error(n)
                }
                return this
            }, shouldBeRegExp: function (t, r) {
                if (!_.isRegExp(t)) {
                    var n = r || constants.ShouldBeRegExp;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeRegExp: function (t, r) {
                if (_.isRegExp(t)) {
                    var n = r || constants.ShouldNotBeRegExp;
                    throw new Error(n)
                }
                return this
            }, shouldBeFalsey: function (t, r) {
                if (!_.isNaN(t) && !_.isNull(t) && !_.isUndefined(t)) {
                    var n = r || constants.ShouldBeFalsey;
                    throw new Error(n)
                }
                return this
            }, shouldNotBeFalsey: function (t, r) {
                if (_.isNaN(t) || _.isNull(t) || _.isUndefined(t)) {
                    var n = r || constants.ShouldNotBeFalsey;
                    throw new Error(n)
                }
                return this
            }, checkArgument: function (t, r) {
                if (!t) {
                    var n = r || constants.IllegalArgument;
                    throw new Error(n)
                }
                return this
            }, checkState: function (t, r) {
                if (!t) {
                    var n = r || constants.IllegalState;
                    throw new Error(n)
                }
                return this
            }, checkElementIndex: function (t, r, n) {
                if (0 > t || t >= r) {
                    var o = n || constants.ShouldHaveValidIndex;
                    throw new Error(o)
                }
                return this
            }, checkPositionIndex: function (t, r, n) {
                if (0 > t || t > r) {
                    var o = n || constants.ShouldHaveValidPosition;
                    throw new Error(o)
                }
                return this
            }, checkPositionIndexes: function (t, r, n, o) {
                var e;
                if (t > r)throw e = o || constants.StartBeforeEnd, new Error(e);
                if (0 > t || r > n)throw e = o || constants.ShouldHaveValidPositions, new Error(e);
                return this
            }
        };
        module.exports = validatorFunctions;
    }, {"./constants": 147, "underscore": 146}],
    150: [function (require, module, exports) {
        (function (n) {
            function e() {
                function e() {
                    if (0 !== a.length) {
                        var n = a.shift();
                        t = r = 0, o = [];
                        try {
                            u = !0;
                            var l = n.apply(e, arguments)
                        } catch (s) {
                            e(s)
                        }
                        void 0 !== l && e(void 0, l), u = !1
                    } else if (arguments[0])throw arguments[0]
                }

                var r, t, o, u, a = Array.prototype.slice.call(arguments);
                e.parallel = function () {
                    function a() {
                        0 === r && e.apply(null, o)
                    }

                    var l = 1 + t++;
                    return r++, n.nextTick(a), function () {
                        r--, arguments[0] && (o[0] = arguments[0]), o[l] = arguments[1], u || a()
                    }
                }, e.group = function () {
                    function r() {
                        0 === a && t(s, l)
                    }

                    var t = e.parallel(), o = 0, a = 0, l = [], s = void 0;
                    return n.nextTick(r), function () {
                        var n = o++;
                        return a++, function () {
                            a--, arguments[0] && (s = arguments[0]), l[n] = arguments[1], u || r()
                        }
                    }
                }, e()
            }

            e.fn = function () {
                var n = Array.prototype.slice.call(arguments);
                return function () {
                    var r = Array.prototype.slice.call(arguments), t = [function () {
                        this.apply(null, r)
                    }].concat(n);
                    "function" == typeof r[r.length - 1] && t.push(r.pop()), e.apply(null, t)
                }
            }, "undefined" != typeof module && "exports"in module && (module.exports = e)
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"));
    }, {"/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95}],
    "./patches/Buffers.monkey": [function (require, module, exports) {
        module.exports = require('kytKTK');
    }, {}],
    "kytKTK": [function (require, module, exports) {
        (function (f) {
            exports.patch = function (t) {
                t.prototype.skip = function (t) {
                    if (0 != t) {
                        if (t == this.length)return this.buffers = [], void(this.length = 0);
                        var s = this.pos(t);
                        this.buffers = this.buffers.slice(s.buf), this.buffers[0] = new f(this.buffers[0].slice(s.offset)), this.length -= t
                    }
                }
            }
        }).call(this, require("buffer").Buffer);
    }, {"buffer": 78}],
    "./patches/Number.monkey": [function (require, module, exports) {
        module.exports = require('AwmEwz');
    }, {}],
    "AwmEwz": [function (require, module, exports) {
        exports.patch = function (t) {
            t.prototype.round = function (t) {
                if (!t)return Math.round(this);
                var r = Math.pow(10, t);
                return Math.round(this * r) / r
            }
        };
    }, {}],
    "./util/BinaryParser": [function (require, module, exports) {
        module.exports = require('b3ZSD7');
    }, {}],
    "b3ZSD7": [function (require, module, exports) {
        (function (t) {
            function r(t) {
                this.subject = t, this.pos = 0
            }

            function o(t) {
                for (var r = 0, o = 0; o < t.length; o++)r += Math.pow(256, o) * t[o];
                return r
            }

            function e(t) {
                for (var r = 0, o = 0; o < t.length; o++)r += Math.pow(256, t.length - o - 1) * t[o];
                return r
            }

            function n(t) {
                var r = e(t);
                return 128 == (128 & t[0]) && (r -= Math.pow(256, t.length)), r
            }

            function s(t) {
                var r = o(t);
                return 128 == (128 & t[t.length - 1]) && (r -= Math.pow(256, t.length)), r
            }

            function i(t, r) {
                return function () {
                    var o = this.buffer(t);
                    return r(o)
                }
            }

            r.prototype.buffer = function (t) {
                var r = this.subject.slice(this.pos, this.pos + t);
                return this.pos += t, r
            }, r.prototype.search = function (r) {
                var o;
                if ("string" == typeof r || t.isBuffer(r))return o = this.subject.slice(this.pos).indexOf(r), -1 !== o && (this.pos += o + r.length), o;
                if ("number" == typeof r) {
                    r = 255 & r;
                    for (var e = this.pos, n = this.subject.length; n > e; e++)if (this.subject[e] == r)return o = e - this.pos, this.pos = e + 1, o;
                    return -1
                }
            }, r.prototype.scan = function (t) {
                var r = this.pos, o = this.search(t);
                if (-1 !== o)return this.subject.slice(r, r + o);
                throw new Error("No match")
            }, r.prototype.eof = function () {
                return this.pos >= this.subject.length
            }, [1, 2, 4, 8].forEach(function (t) {
                var p = 8 * t;
                r.prototype["word" + p + "le"] = r.prototype["word" + p + "lu"] = i(t, o), r.prototype["word" + p + "ls"] = i(t, s), r.prototype["word" + p + "be"] = r.prototype["word" + p + "bu"] = i(t, e), r.prototype["word" + p + "bs"] = i(t, n), r.prototype.word8 = r.prototype.word8u = r.prototype.word8be, r.prototype.word8s = r.prototype.word8bs
            }), r.prototype.varInt = function () {
                var t = this.word8();
                switch (t) {
                    case 253:
                        return this.word16le();
                    case 254:
                        return this.word32le();
                    case 255:
                        return this.word64le();
                    default:
                        return t
                }
            }, r.prototype.varStr = function () {
                var t = this.varInt();
                return this.buffer(t)
            }, module.exports = r
        }).call(this, require("buffer").Buffer);
    }, {"buffer": 78}],
    157: [function (require, module, exports) {
        var fs = require("fs"), crypto = require("crypto");
        exports.readFileSync = function (r, e, i) {
            var t = fs.readFileSync(i, "binary");
            if (t.length < 32)throw new Error("Crypted file " + i + " truncated");
            var a = t.slice(0, -32), n = t.slice(-32), c = crypto.createHmac("sha256", e);
            c.update(a);
            var y = c.digest("binary");
            if (y.toString() != n.toString())throw new Error("Crypted file " + i + " failed HMAC checksum verification");
            var o = crypto.createDecipher(r, e), p = o.update(a, "binary", "binary");
            return p += o.final("binary")
        }, exports.readJFileSync = function (r, e, i) {
            var t = this.readFileSync(r, e, i);
            return JSON.parse(t)
        }, exports.writeFileSync = function (r, e, i, t) {
            var a = crypto.createCipher(r, e), n = a.update(t, "binary", "binary");
            n += a.final("binary");
            var c = crypto.createHmac("sha256", e);
            c.update(n);
            var y = c.digest("binary");
            return fs.writeFileSync(i, n + y, "binary"), !0
        }, exports.writeJFileSync = function (r, e, i, t) {
            var a = JSON.stringify(t);
            return this.writeFileSync(r, e, i, a)
        };
    }, {"crypto": 82, "fs": 74}],
    "./util/EncodedData": [function (require, module, exports) {
        module.exports = require('eLfUFE');
    }, {}],
    "eLfUFE": [function (require, module, exports) {
        (function (n) {
            function t(n, t) {
                this.data = n, t || "string" != typeof n ? ("undefined" == typeof this.encodings[t] && (t = "binary"), this.converters = this.encodings[t].converters, this._encoding = this.encodings[t]._encoding) : (t = "base58", this.converters = this.encodings[t].converters, this._encoding = this.encodings[t]._encoding)
            }

            var i = require("../lib/Base58").base58Check;
            t.prototype.encoding = function (n) {
                return n && n != this._encoding && (this.data = this.as(n), this.converters = this.encodings[n].converters, this._encoding = this.encodings[n]._encoding), this._encoding
            }, t.prototype.withEncoding = function (n) {
                return new t(this.as(n), n)
            }, t.prototype.as = function (n) {
                if (!e[n])throw new Error("invalid encoding: " + n);
                return this.converters[n].call(this)
            }, t.prototype._validate = function () {
                this.withEncoding("binary")
            }, t.prototype.isValid = function () {
                try {
                    return this.validate(), !0
                } catch (n) {
                    return !1
                }
            }, t.prototype.validate = function () {
                this._validate()
            }, t.prototype.toString = function () {
                return this.as("base58")
            }, t.prototype.doAsBinary = function (n) {
                var t = this.encoding();
                this.encoding("binary"), n.apply(this), this.encoding(t)
            };
            var e = {
                binary: {
                    converters: {
                        binary: function () {
                            var t = new n(this.data.length);
                            return this.data.copy(t), t
                        }, base58: function () {
                            return i.encode(this.data)
                        }, hex: function () {
                            return this.data.toString("hex")
                        }
                    }, _validate: function () {
                    }
                }, base58: {
                    converters: {
                        binary: function () {
                            return i.decode(this.data)
                        }, hex: function () {
                            return this.withEncoding("binary").as("hex")
                        }
                    }
                }, hex: {
                    converters: {
                        binary: function () {
                            return new n(this.data, "hex")
                        }, base58: function () {
                            return this.withEncoding("binary").as("base58")
                        }
                    }
                }
            }, r = function () {
                return this.data
            };
            for (var o in e)e.hasOwnProperty(o) && (e[o].converters[o] || (e[o].converters[o] = r), e[o]._encoding = o);
            t.applyEncodingsTo = function (n) {
                var t = {};
                for (var i in e) {
                    var r = e[i], o = Object.create(n.prototype);
                    for (var s in r)o[s] = r[s];
                    t[i] = o
                }
                n.prototype.encodings = t
            }, t.applyEncodingsTo(t), module.exports = t
        }).call(this, require("buffer").Buffer);
    }, {"../lib/Base58": "6VqyzY", "buffer": 78}],
    "QLzNQg": [function (require, module, exports) {
        (function (i) {
            function t(e, n) {
                t.super_.call(this, e, n), "number" == typeof e && (this.data = new i(n.length + 1), this.encoding("binary"), this.version(e), this.payload(n))
            }

            var e = (require("../lib/Base58").base58Check, require("util")), n = require("./EncodedData");
            e.inherits(t, n), n.applyEncodingsTo(t), t.prototype.version = function (i) {
                return i || 0 === i ? (this.doAsBinary(function () {
                    this.data.writeUInt8(i, 0)
                }), i) : this.as("binary").readUInt8(0)
            }, t.prototype.payload = function (i) {
                return i ? (this.doAsBinary(function () {
                    i.copy(this.data, 1)
                }), i) : this.as("binary").slice(1)
            }, module.exports = t
        }).call(this, require("buffer").Buffer);
    }, {"../lib/Base58": "6VqyzY", "./EncodedData": "eLfUFE", "buffer": 78, "util": 111}],
    "./util/VersionedData": [function (require, module, exports) {
        module.exports = require('QLzNQg');
    }, {}],
    162: [function (require, module, exports) {
        function MissingSourceError(r, i) {
            Error.call(this), this.message = r, this.missingTxHash = i, this.name = "MissingSourceError"
        }

        function VerificationError(r, i) {
            Error.call(this), this.message = r, this.missingTxHash = i, this.name = "VerificationError"
        }

        MissingSourceError.prototype = Object.create(Error.prototype), exports.MissingSourceError = MissingSourceError, VerificationError.prototype = Object.create(Error.prototype), exports.VerificationError = VerificationError;
    }, {}],
    163: [function (require, module, exports) {
        module.exports = require("./util");
    }, {"./util": "ACyo5H"}],
    "./util/log": [function (require, module, exports) {
        module.exports = require('AdF7pF');
    }, {}],
    "AdF7pF": [function (require, module, exports) {
        "use strict";
        var noop = function () {
        }, cl = function () {
            console.log(arguments)
        }, loggers = {
            none: {info: noop, warn: noop, err: noop, debug: noop},
            normal: {info: cl, warn: cl, err: cl, debug: noop},
            debug: {info: cl, warn: cl, err: cl, debug: cl}
        }, config = require("../config");
        module.exports = config.log ? config.log : loggers[config.logger || "normal"];
    }, {"../config": "4itQ50"}],
    166: [function (require, module, exports) {
        exports.curtime = function () {
            return Math.round(Date.now() / 1e3)
        };
    }, {}],
    "ACyo5H": [function (require, module, exports) {
        (function (e, r) {
            function t(e) {
                for (e = e.substr(0, 8); e.length < 8;)e += "0";
                return e
            }

            function n(e) {
                return i(e[1]).mul("100000000").add(t(e[2]))
            }

            function o(e) {
                return i(t(e[1]))
            }

            function f(e) {
                return i(e[1]).mul("100000000")
            }

            var u = require("crypto"), i = require("bignum"), s = require("binary"), a = require("bufferput"), c = require("buffertools"), l = require("../lib/sjcl");
            if (e.browser)var h = require("hash.js");
            {
                var p = exports.sha256 = function (e) {
                    return new r(u.createHash("sha256").update(e).digest("binary"), "binary")
                }, v = (exports.sha512 = function (t) {
                    if (e.browser) {
                        var n = t.toString("hex"), o = l.codec.hex.toBits(n), f = l.hash.sha512.hash(o), i = l.codec.hex.fromBits(f), s = new r(i, "hex");
                        return s
                    }
                    return new r(u.createHash("sha512").update(t).digest("binary"), "binary")
                }, exports.sha512hmac = function (t, n) {
                    if (e.browser) {
                        var o = l.codec.hex.toBits(n.toString("hex")), f = l.codec.hex.toBits(t.toString("hex")), i = new l.misc.hmac(o, l.hash.sha512), s = i.encrypt(f), a = l.codec.hex.fromBits(s), c = new r(a, "hex");
                        return c
                    }
                    var i = u.createHmac("sha512", n), h = i.update(t).digest();
                    return h
                }, exports.ripe160 = function (t) {
                    return e.browser ? new r(h.ripemd160().update(t).digest()) : new r(u.createHash("rmd160").update(t).digest("binary"), "binary")
                }), d = (exports.sha1 = function (e) {
                    return new r(u.createHash("sha1").update(e).digest("binary"), "binary")
                }, exports.twoSha256 = function (e) {
                    return p(p(e))
                }, exports.sha256ripe160 = function (e) {
                    return v(p(e))
                }, exports.formatHash = function (e) {
                    var t = new r(10);
                    return e.copy(t, 0, 22, 32), c.reverse(t).toString("hex")
                }, exports.formatHashFull = function (e) {
                    var t = new r(e.length);
                    e.copy(t);
                    var n = c.toHex(c.reverse(t));
                    return n
                }), g = (exports.formatHashAlt = function (e) {
                    var r = d(e);
                    return r = r.replace(/^0*/, ""), r.substr(0, 10)
                }, exports.formatBuffer = function (e, t) {
                    null === t && (t = 10), (t > e.length || 0 === t) && (t = e.length);
                    var n = new r(t);
                    e.copy(n, 0, 0, t);
                    var o = c.toHex(n);
                    return n.length < e.length && (o += "..."), o
                }, exports.valueToBigInt = function (e) {
                    return r.isBuffer(e) ? i.fromBuffer(e, {endian: "little", size: 8}) : e
                });
                exports.bigIntToValue = function (e) {
                    return r.isBuffer(e) ? e : e.toBuffer({endian: "little", size: 8})
                }
            }
            exports.bytesNeededToStore = bytesNeededToStore = function (e) {
                return 0 === e ? 0 : Math.ceil((e.toString(2).replace("-", "").length + 1) / 8)
            }, exports.negativeBuffer = negativeBuffer = function (e) {
                for (var t = new r(e.length), n = 0; n < e.length; n++)t[n] = ~e[n], t[n] < 0 && (t[n] += 256);
                for (var n = e.length - 1; n >= 0 && (t[n] += 1, t[n] >= 256 && (t[n] -= 256), 0 === t[n]); n--);
                return t
            }, exports.intToBuffer2C = function (e) {
                var r = bytesNeededToStore(e), t = new a, n = e.toString(16), o = "-" === n[0];
                n = n.replace("-", "");
                for (var f = 0; r > f; f++) {
                    var u = n.substring(n.length - 2 * (f + 1), n.length - 2 * f);
                    1 === u.length && (u = "0" + u);
                    var i = parseInt(u, 16);
                    t.word8(i)
                }
                var s = t.buffer();
                return o && (s = c.reverse(s), s = negativeBuffer(s), s = c.reverse(s)), s
            };
            var w = function (e) {
                var t;
                return 128 & e[0] ? (t = new r(e.length + 1), e.copy(t, 1), t[0] = 0) : t = e, t
            };
            exports.intToBufferSM = function (e) {
                "number" == typeof e && (e = i(e));
                var t, n, o = e.cmp(0);
                return o > 0 ? (t = e.toBuffer(), n = w(t), n = c.reverse(n)) : 0 == o ? n = new r([]) : (t = e.neg().toBuffer(), n = w(t), n[0] |= 128, n = c.reverse(n)), n
            }, exports.bufferSMToInt = function (e) {
                if (!e.length)return i(0);
                if (e.length > 4)throw new Error("Bigint cast overflow (> 4 bytes)");
                var t = new r(e.length);
                e.copy(t), t = c.reverse(t);
                var n = 128 & t[0];
                return n ? (t[0] &= 127, i.fromBuffer(t).neg()) : i.fromBuffer(t)
            };
            var x = (exports.formatValue = function (e) {
                for (var r = g(e).toString(), t = r.length > 8 ? r.substr(0, r.length - 8) : "0", n = r.length > 8 ? r.substr(r.length - 8) : r; n.length < 8;)n = "0" + n;
                for (n = n.replace(/0*$/, ""); n.length < 2;)n += "0";
                return t + "." + n
            }, /^\s*(\d+)\.(\d+)/), b = /^\s*\.(\d+)/, B = /^\s*(\d+)/;
            exports.parseValue = function (e) {
                "string" != typeof e && (e = e.toString());
                var r = e.match(x);
                return r ? n(r) : (r = e.match(b)) ? o(r) : (r = e.match(B), r ? f(r) : void 0)
            };
            {
                var m = (exports.createSynchrotron = function (e) {
                    var r = {};
                    return function (t) {
                        var n = Array.prototype.slice.call(arguments), o = function () {
                            n[0] = function () {
                                r[t] && (r[t].length ? r[t].shift()() : delete r[t])
                            }, e.apply(null, n)
                        };
                        r[t] ? r[t].push(o) : (r[t] = [], o())
                    }
                }, exports.decodeDiffBits = function (e, t) {
                    e = +e;
                    for (var n = i(16777215 & e), o = 8 * ((e >>> 24) - 3); o-- > 0;)n = n.mul(2);
                    if (t)return n;
                    var f = n.toBuffer(), u = new r(32);
                    return c.fill(u, 0), f.copy(u, 32 - f.length), u
                }), y = (exports.encodeDiffBits = function (e) {
                    if (r.isBuffer(e))e = i.fromBuffer(e); else if ("function" != typeof e.toBuffer)throw new Error("Incorrect variable type for difficulty");
                    var t = e.toBuffer("mpint"), n = t.length - 4, o = n << 24;
                    return n >= 1 && (o |= t[4] << 16), n >= 2 && (o |= t[5] << 8), n >= 3 && (o |= t[6]), o
                }, exports.calcDifficulty = function (e) {
                    r.isBuffer(e) || (e = m(e));
                    var t = i.fromBuffer(e, {order: "forward"}), n = i.fromBuffer(S, {order: "forward"});
                    return n.div(t).toNumber()
                }, exports.reverseBytes32 = function (e) {
                    if (e.length % 4)throw new Error("Util.reverseBytes32(): Data length must be multiple of 4");
                    for (var r = new a, t = s.parse(e); !t.eof();) {
                        var n = t.word32le("word").vars.word;
                        r.word32be(n)
                    }
                    return r.buffer()
                }, exports.getVarIntSize = function (e) {
                    return 253 > e ? 1 : 65536 > e ? 3 : 4294967296 > e ? 5 : 9
                }, exports.varIntBuf = function (e) {
                    var t = void 0;
                    return 253 > e ? (t = new r(1), t.writeUInt8(e, 0)) : 65536 > e ? (t = new r(3), t.writeUInt8(253, 0), t.writeUInt16LE(e, 1)) : 4294967296 > e ? (t = new r(5), t.writeUInt8(254, 0), t.writeUInt32LE(e, 1)) : (t = new r(9), t.writeUInt8(255, 0), t.writeInt32LE(-1 & e, 1), t.writeUInt32LE(Math.floor(e / 4294967296), 5)), t
                });
                exports.varStrBuf = function (e) {
                    return r.concat([y(e.length), e])
                }
            }
            exports.NULL_HASH = c.fill(new r(32), 0), exports.EMPTY_BUFFER = new r(0), exports.ZERO_VALUE = c.fill(new r(8), 0);
            var I = new r("ffffffffffffffff", "hex");
            exports.INT64_MAX = I, exports.COIN = 1e8, exports.BIT = 100;
            var S = exports.MAX_TARGET = new r("00000000FFFF0000000000000000000000000000000000000000000000000000", "hex")
        }).call(this, require("/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), require("buffer").Buffer);
    }, {
        "../lib/sjcl": "oLMOpG",
        "/Users/ryanxcharles/dev/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 95,
        "bignum": 49,
        "binary": 66,
        "buffer": 78,
        "bufferput": "aXRuS6",
        "buffertools": "fugeBw",
        "crypto": 82,
        "hash.js": 138
    }],
    "./util/util": [function (require, module, exports) {
        module.exports = require('ACyo5H');
    }, {}]
}, {}, [])