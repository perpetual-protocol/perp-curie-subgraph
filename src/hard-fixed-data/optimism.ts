import { BigDecimal, TypedMap } from "@graphprotocol/graph-ts"
import { BaseTokenMap, DataMap } from "./types"

export const hardFixedDataMap = new TypedMap<string, BaseTokenMap>()
let dataMap: TypedMap<string, BigDecimal>
let baseTokenMap: TypedMap<string, DataMap>

// replace below code from GraphIncorrectDataAnalyzer.ts
// trader: 0x6a928643e35e254fcc6927c689694897712d3827
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.051632034682046271"))
dataMap.set("openNotional", BigDecimal.fromString("-2933.432773566675797385"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0xec7289f035dfdeb32ffdfa524af1a21473e889834583908fc0cd690273d24dcb", baseTokenMap)

// trader: 0x11218abe74f7423f42a0c2404402ee7c66924063
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.460349485870256446"))
dataMap.set("openNotional", BigDecimal.fromString("-6499.918125523574269361"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x40c57db68ca19c87ab6d24b78936bbe19e3bde6d2cee44aecd54c77710e38dd1", baseTokenMap)

// trader: 0x9832dbbaeb7cc127c4712e4a0bca286f10797a6f
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("5.572163003612252019"))
dataMap.set("openNotional", BigDecimal.fromString("-24751.999998688891690671"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xfbbe25cf3e75a06ef6590425a36672861c23712074b17c83423e681e2b9baf1a", baseTokenMap)

// trader: 0x1e97897708649b4b3b5239cc3c673f9f875ca991
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.577460233377411986"))
dataMap.set("openNotional", BigDecimal.fromString("-2667.251594767424308952"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xe14cb2ea5f3819b82fdb771fb540244d2e90488861eac4dda941ab8016f3e5e3", baseTokenMap)

// trader: 0xf151362c37987d61ecb225d0325030fce6f3318a
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("10.986748104363308033"))
dataMap.set("openNotional", BigDecimal.fromString("-51256.046124410876936203"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xb911419c158a067378bea3442cb3b1ea11462908f291f99b930e7c06c1f0dc17", baseTokenMap)

// trader: 0x7ba243a777b1899ae6ba2f47e0fcc61a692b7003
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("34.434815695711216323"))
dataMap.set("openNotional", BigDecimal.fromString("-149999.999998235949075635"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x45721949d8ab95c6de0a0d620182e6c20629f067a3cf4c23b4f6e501fadbe0f8", baseTokenMap)

// trader: 0x3b6732ac68fcb127f3c1cc988c4e5b356588d988
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.910984671746014639"))
dataMap.set("openNotional", BigDecimal.fromString("-3896.238218858763109716"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xe573eaa02113222b9082fb34511ba1078868db373afe99897f3a0a1524137153", baseTokenMap)

// trader: 0x26caae548b7cecf98da12ccaaa633d6d140447aa
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.172356677017173234"))
dataMap.set("openNotional", BigDecimal.fromString("-799.999999921817336079"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xacc9ab3b4e92efc70ac6866f10e8df81b87e1e33f211c274305f6434b47a4cfc", baseTokenMap)

// trader: 0x4c37700d949db46aa11a9f1627070f9af31f8011
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.72901078592121908"))
dataMap.set("openNotional", BigDecimal.fromString("-3001.312415266965064591"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x0f1532684d8f7c5127eb9add7638337c1ab0bc3adb41f0597ad9ae69e9631ec5", baseTokenMap)

// trader: 0x1f917ee189d9c3d745b1493820bd6247ba59a2eb
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.028541320609134875"))
dataMap.set("openNotional", BigDecimal.fromString("-116.720147483480538853"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xb56f4e7484236479b159762d33e8f549c316325949b39c5d903be23bd62b2cd6", baseTokenMap)

// trader: 0xfd350d24087db7ef3d730ea57f04bbde7f95786d
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.034383015116418913"))
dataMap.set("openNotional", BigDecimal.fromString("-139.101765736090569352"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xb15f7e1258d8854b913289f175b83bf748908d64fbb2ae717b82705975a5933b", baseTokenMap)

// trader: 0x296897c5b419c2217719dc699d244e595d675d07
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.05807628381502033"))
dataMap.set("openNotional", BigDecimal.fromString("-226.86272665018156488"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x9db4429adddf6081ec994ed4cfa774ce6f8342bf2026452a171e740d633abd63", baseTokenMap)

// trader: 0x8a8e1734ae500287d8bf4571cf411b4198234195
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.645392722981352665"))
dataMap.set("openNotional", BigDecimal.fromString("-2538.202163661621697596"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x5563b98ad9d0030546029205963cff9936884d0ae47299dd813de65d280fe577", baseTokenMap)

// trader: 0xfc0591893b0bdb4322d25bdd43904aa9ab137140
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.173724870316888718"))
dataMap.set("openNotional", BigDecimal.fromString("-703.06308501571304537"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xcaff1e618343e4cb426813809c32e293b106d7f0fac288fa845ea876d692c8bf", baseTokenMap)

// trader: 0x0bd54e59ff6b564cdd2c8a816d1d6ea0d99a132c
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.077904693941897733"))
dataMap.set("openNotional", BigDecimal.fromString("-307.32914673822411009"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x71ec3b86295c10f45a9aee320058ba163ba0bf5fae7a20bb593fec611621bd35", baseTokenMap)

// trader: 0x804debc8807aee993a727b37d81d7a379da59fe6
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.03205681666375927"))
dataMap.set("openNotional", BigDecimal.fromString("-129.151870988814650455"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x5d3970606860364aa5a4ec364d5712e924633f4b505a475ef27b1ae6487af9fc", baseTokenMap)

// trader: 0xc0b2b0d1ed3d743f409b65821abfd0d249a46bce
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.000195953647383112"))
dataMap.set("openNotional", BigDecimal.fromString("-9.999999999886286086"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x6837a454d1c5b8553b7220376e3103f93957be4f7e547422dee10add6348b7cc", baseTokenMap)

// trader: 0x3c8cfc48fca36cd7e0a2ecbe8277c8ef1fa1392b
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.084600655386245743"))
dataMap.set("openNotional", BigDecimal.fromString("-4293.901924727058651016"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0xdf9adb5eca7b6f7df863f35a58c2afa4017bb7493cbf48c8049006b7f8cf87dd", baseTokenMap)

// trader: 0xfdc46fbdd8af50d9bf7536bf44ce8560e423352c
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.011610710466522034"))
dataMap.set("openNotional", BigDecimal.fromString("-567.786643508816024982"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x20f7b68ebdb17218b002998945b3ed53017e1fc1202bbaada76be2636def769f", baseTokenMap)

// trader: 0xfb8782691b2b7185079c1817c41d85c756e169c4
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.457482884467248258"))
dataMap.set("openNotional", BigDecimal.fromString("-1833.289595559272428555"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xba8afdf02f6a85ba81d470587ed8084ec8e763c684d5a2e4603c8c6e20ebdf9d", baseTokenMap)

// trader: 0x53b015573630d248a32b11b21e5443efb92d9cfb
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.034654057224517027"))
dataMap.set("openNotional", BigDecimal.fromString("-136.604276549342902563"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x6b0a061249f2b088e7196ab8b87892c55fbea25b66008e889a2337fbfc9866b8", baseTokenMap)

// trader: 0x6dc88b231cd04dd1b1e525161162993f47140006
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.347790145317043615"))
dataMap.set("openNotional", BigDecimal.fromString("-5273.231093987980860282"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x09f8edaefefb3a411f9c7eb100bb83498951ce3d152ded9adbfc737b97750485", baseTokenMap)

// trader: 0x22471d16788fd30cc59dea4dce9180d0cc50eac7
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.033340212701955568"))
dataMap.set("openNotional", BigDecimal.fromString("-125.803297158571796361"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x85198ec058012f00bccdb48db4a7704059d29f1f6fca5fd899f3da232b5623a4", baseTokenMap)

// trader: 0x83eccb05386b2d10d05e1baea8ac89b5b7ea8290
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.008860657443770043"))
dataMap.set("openNotional", BigDecimal.fromString("-449.999999840833379712"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0xcf548d66d5a8f3e7bb9950310a1abee2a31a71bb3ded25162e87d464e1ede44d", baseTokenMap)

// trader: 0xf26e5b93453a69a0297dc66e7bbd750d2b28160b
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.030972608706330697"))
dataMap.set("openNotional", BigDecimal.fromString("-114.963468360408251353"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xc883c7c5b2a2b4a4189b5d49b187e73691c04b7314855d5ff50dd4dd81456e77", baseTokenMap)

// trader: 0xdc90062b1202cf30cf2fc6b2cca007af94c8f231
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.145256438657961601"))
dataMap.set("openNotional", BigDecimal.fromString("-549.999999991581652914"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x1cb69544f73a89165f2e23cc3ff61cc70c3538432ec51c64eeae94fda52e42a3", baseTokenMap)

// trader: 0xba2ef5189b762bd4c9e7f0b50fbbab65193935e8
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.02095170282153946"))
dataMap.set("openNotional", BigDecimal.fromString("-954.85958530700000455"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x9a1f3f6ecb968a27460b0d06424784d159c741fb22def99b9048b1284e87fc64", baseTokenMap)

// trader: 0xba2ef5189b762bd4c9e7f0b50fbbab65193935e8
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.260574078729769779"))
dataMap.set("openNotional", BigDecimal.fromString("-974.52109153581817012"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x5cc7fd62f2bc6ab9c8b39a5cba0dfa1df98ab635781445dbb6cbf376fb42fedf", baseTokenMap)

// trader: 0xebc462355194903ad1ad32fa767b3b74d5aca278
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("25.009265068911949967"))
dataMap.set("openNotional", BigDecimal.fromString("-99742.964608526582810745"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x3c8bf16a49211557952b9f305816efc9ee23dec9e297e5e04f59e63d2a909bac", baseTokenMap)

// trader: 0x3578db872e9899d8bf0ff1198fdf8dba74ec3733
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.03100638019103681"))
dataMap.set("openNotional", BigDecimal.fromString("-117.446658520564723128"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xdc7bf32b90bd9fae96ea909758dbb5ba26c8314141115de7cfe2fb785eff9e51", baseTokenMap)

// trader: 0x1904560c3fb108cd5d67cb4d0714ab4eda068ffd
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.750808479456351224"))
dataMap.set("openNotional", BigDecimal.fromString("-3251.81998566823174355"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x4dcc9a4e048f7a2df36f982498fe9baa779efe2177c4c5b61ff972622f06c7b3", baseTokenMap)

// trader: 0xd0ac50d9f7516be16e2449539394a3967bea03c7
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.114583088708086733"))
dataMap.set("openNotional", BigDecimal.fromString("-427.46808261154559742"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xef8699661f127d264cadc37a44835bea71cf24067b04dee5ebae2b9436fcd09c", baseTokenMap)

// trader: 0x26c9a6c65d9ff6cd9461e3c0d6213711b8ad4790
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.004907925769893708"))
dataMap.set("openNotional", BigDecimal.fromString("-19.999999999822431492"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xcb3429ac0b5496055c30a0717241f2b87f84161a95fd2f6f41cbaf55e17143bf", baseTokenMap)

// trader: 0x0a2a34cdfbade6634d902d0d0a8dc7533d26f7e3
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.173195919645165241"))
dataMap.set("openNotional", BigDecimal.fromString("-664.457223913581626529"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xd05f0f7e29e97ef30b672dbce520b68696f3d44e341710543939e264eab4267f", baseTokenMap)

// trader: 0x5ea61c2d641faf0368deb0c0790dd6a4ee8b23ff
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.082854404227397807"))
dataMap.set("openNotional", BigDecimal.fromString("-302.245503960082020163"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xde899b4176d2053e4784b8f5463ecefa38655a2a1dd60eaf364dd57d2946a796", baseTokenMap)

// trader: 0xb273a9c431ffc1eb811191ed4318454275954fe5
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.146898609147071652"))
dataMap.set("openNotional", BigDecimal.fromString("-524.999999995490332942"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x556926e370ecab1c46d199159efd4d942eee6ee42b793106b4554f28cd26dabe", baseTokenMap)

// trader: 0xff5df32fc2ad0421662109f6998fdf7db30944a7
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.469379550060535089"))
dataMap.set("openNotional", BigDecimal.fromString("-1663.330681400295882283"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xe7b79c5a135cf2a8b13bcc322c13629ca0cc962205f04eddd3a9f64551b64494", baseTokenMap)

// trader: 0x73bd85d1270a9a5aeeb2ac5f982f7aa88a6d1e42
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.000113634291468757"))
dataMap.set("openNotional", BigDecimal.fromString("-5.159727457318250963"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x199ed2049b80bd1a53b401c81a50ae7875dd74a08eb04b389eea5ff413126590", baseTokenMap)

// trader: 0x952c23f8f067a5e7e165ff0e42491f51d87dbc95
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.001396209019000486"))
dataMap.set("openNotional", BigDecimal.fromString("-4.940383962016301378"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x1257228c26ed029ee7a96a0528497a7587e9c5c344a07f9e0684445c43cf7ce3", baseTokenMap)

// trader: 0xe0a68214ffda2ebbdc78c0e748071cfd8f701948
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("27.503060544158251283"))
dataMap.set("openNotional", BigDecimal.fromString("-97350.630377675233996379"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x219a477af7c7eb8461ee99ff710f35dbf541d3ed7583abe81c9532e7e096ab63", baseTokenMap)

// trader: 0x1f2169049d48f18009ffaa7107956e9f4f9d816c
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.149700459313516318"))
dataMap.set("openNotional", BigDecimal.fromString("-542.127131063798651284"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xf7b212b8dd1cdfed1351364ad95b0762d52524d04dfad4a2fe64b7b8aa890a69", baseTokenMap)

// trader: 0x3288338837dc90afbb81a93e5a9c3c5688436e10
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.039963367435138834"))
dataMap.set("openNotional", BigDecimal.fromString("-143.599999999999999999"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x51ca3a37c83ed3219047e0f1898219e5b8d52286454e1b79926860e620442d3d", baseTokenMap)

// trader: 0xa97aaf7a996bcfec0fb02e9645a0458b83870d2f
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.84869736396878177"))
dataMap.set("openNotional", BigDecimal.fromString("-7052.536082307397184037"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x4fe4898b028c8444b24aa22d3862fbf84a4ed438aeb31739c7386989507a73bb", baseTokenMap)

// trader: 0xca1d5098a09c31da13b489a935cdb06f1bc8518e
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.304595136638884201"))
dataMap.set("openNotional", BigDecimal.fromString("-1099.99999999039015145"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x8dd6a9dae92bdda9c6cad31e81c2fe0a600223a69a858dc0814c04971c7f446f", baseTokenMap)

// trader: 0x73bd85d1270a9a5aeeb2ac5f982f7aa88a6d1e42
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.000966983385933668"))
dataMap.set("openNotional", BigDecimal.fromString("-3.499999999999999999"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x4af40507ade1e7e6aa54bb900dd1e6c9ba1153322f0ff717a46d72c1170dbeca", baseTokenMap)

// trader: 0x070fc9b609b374ec663a67feec787693323d7844
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.255181212842353242"))
dataMap.set("openNotional", BigDecimal.fromString("-1012.661466983396730405"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x36e5ddc6dd58157163ac028b577d9d66c61d53aae1431287b1be72362d8b54c8", baseTokenMap)

// trader: 0xb88e3c784257f62284c0c1d2c49af4e3ad2b02ad
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.317767521285295159"))
dataMap.set("openNotional", BigDecimal.fromString("-13389.552301352644553611"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x5a4d05b0f1aec971c3c6620410a87475e17c8ca3b855a4ddda35d3bea40affcb", baseTokenMap)

// trader: 0xb88e3c784257f62284c0c1d2c49af4e3ad2b02ad
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("46.119307309886507764"))
dataMap.set("openNotional", BigDecimal.fromString("-149062.526549625780718532"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x86cbbcfefe3157740577f229a73e0e501a9e21494e7b8870b99d5c03a1ce7813", baseTokenMap)

// trader: 0x7bc17f42367cfbe17f9c51d96a4a90f152735420
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.013582162726049903"))
dataMap.set("openNotional", BigDecimal.fromString("-56.195797222970793787"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x059bb9fc7f94bc9c73f5c6b4843c41c3b9c1d8166a489a8e30514e33d9e5f070", baseTokenMap)

// trader: 0xe717c3dcc661f4823948483cccd4b9f4d178a97d
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.023760023994473398"))
dataMap.set("openNotional", BigDecimal.fromString("-84.299625071269826397"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xbb80ed65c16e8e4d38b6115f643de26cc7a6bffc76a84c1bd9fa845a3a948e77", baseTokenMap)

// trader: 0xbe2657fb191531b42104e183a2683d0af4d798a9
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.176469868948032319"))
dataMap.set("openNotional", BigDecimal.fromString("-574.531219976295296329"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xce1bceae51e5a29e93d9765b9ade8fe5f3fdb705dd3b27d877f5571a1f469a94", baseTokenMap)

// trader: 0x6638ae5181daa36588392537f7dc576b4cdb10c0
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.053923186415532483"))
dataMap.set("openNotional", BigDecimal.fromString("-181.524279476316339745"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x9eb2b1a08c604e5922c61acd8eb88b010637e0ac8d2ab19166b2810f14e484a5", baseTokenMap)

// trader: 0xcb328ec728b1c664e352cc0b7407dfcaa7e84dfb
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.100324875875397842"))
dataMap.set("openNotional", BigDecimal.fromString("-4621.493584011587787975"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x3b21b0c669d9652b8d6f09876d9d621e545deb16effb4161c85929e3ff22b656", baseTokenMap)

// trader: 0x6d033e0edca8557bf1453d0146e5f595f6607731
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.176663131307310541"))
dataMap.set("openNotional", BigDecimal.fromString("-649.999999998720246735"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x1d48add67a03bfd2553ea16345a9799c1d5c949ffab6dd1ed748f24169b3fbd0", baseTokenMap)

// trader: 0xba9fd438145209a6149a1d79bd3ddc370d0548a4
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("2.439136259903865305"))
dataMap.set("openNotional", BigDecimal.fromString("-9999.999999911134659744"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xa90c9dcd515f69de490c8b75992a442abf8338a18c94c3fb05354b53e0aa5b63", baseTokenMap)

// trader: 0x7ba243a777b1899ae6ba2f47e0fcc61a692b7003
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("13.140470329629470522"))
dataMap.set("openNotional", BigDecimal.fromString("-46999.999999658004496346"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x348310109e73a217fdbd9fedb30a108f2248e64accc611d72865f5ae42698f67", baseTokenMap)

// trader: 0x40f404fe6c091b951576ecc7bcce5ecd56c985f7
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.863697903152127612"))
dataMap.set("openNotional", BigDecimal.fromString("-5649.999999872347715766"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x643ec75eb6f68094bae3e0593c8d3bb1d6979a26937b0c9ee59a7619ca7ebfec", baseTokenMap)

// trader: 0x9455b22685036d89874296460fb28de8a70a6a66
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("14.97596356115415299"))
dataMap.set("openNotional", BigDecimal.fromString("-606159.879767089181361091"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x6ef493b4fdd8d7e12e216efc60ba6f2ad4be31abe4178d224639eb26f0455233", baseTokenMap)

// trader: 0xec5c16f3eaf86a801a3e89201dd39bddd1786cbf
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.028777501370355134"))
dataMap.set("openNotional", BigDecimal.fromString("-89.999999999633202658"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xc3f198dd60db076d733d10c9f022fa0ad49c2290005ae4ba83c3f2e893341f5b", baseTokenMap)

// trader: 0x856e45cce77685627dad82f0d1d63c8642152ec8
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.206862204987864221"))
dataMap.set("openNotional", BigDecimal.fromString("-3901.836663913493932578"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xa2da394e8580f5bea4f4ad107fb1b34cea477773efe48aa9e4b6b9f54e3d0165", baseTokenMap)

// trader: 0x9455b22685036d89874296460fb28de8a70a6a66
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1062.191280327135309466"))
dataMap.set("openNotional", BigDecimal.fromString("-3311823.948983136903565523"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x9b25f9b9b74ad534dc75d955b5f7c6cbe1d6679e22bc27a87b0b03d7f8e48336", baseTokenMap)

// trader: 0x0c35728bd5c481a2b7a1ba17605483b08efa677b
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.241553845534025988"))
dataMap.set("openNotional", BigDecimal.fromString("-10210.199999915764747708"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x261121bd4ce10a7951727ba1cdb7f589bb372ae201df715fa2692f8e70d4304a", baseTokenMap)

// trader: 0xab12253171a0d73df64b115cd43fe0a32feb9daa
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("4.428734744158395196"))
dataMap.set("openNotional", BigDecimal.fromString("-337.677766208898666602"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x5faa136fc58b6136ffdaeaac320076c4865c070f", dataMap)
hardFixedDataMap.set("0x003e6dd06a03175f2bd4abf838c2289707f1ce8455076bb5520516f377bf7d60", baseTokenMap)

// trader: 0xab12253171a0d73df64b115cd43fe0a32feb9daa
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.539584597833031419"))
dataMap.set("openNotional", BigDecimal.fromString("-1541.184091144491430291"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x6ec1ced0a7a60134ed7dae8c9ac3e44428893a32ec05394ffc417b47a1aa876c", baseTokenMap)

// trader: 0xead33c3bb40f7cd230ed9ede50f13ec86b0a6502
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.113022310052981337"))
dataMap.set("openNotional", BigDecimal.fromString("-417.636464049502768473"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xd30cae9535f5c7be89bdc8f506d927e9c64bf45c1ec115400e6e1fb7e42480c4", baseTokenMap)

// trader: 0xf4844a06d4f995c4c03195afcb5aa59dcbb5b4fc
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.026134292315720412"))
dataMap.set("openNotional", BigDecimal.fromString("-104.999999986489943007"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x0d5b5970ef81a18f7fe64116508c65bffc6f31bf23348f62892aa33a73440c2b", baseTokenMap)

// trader: 0x0c35728bd5c481a2b7a1ba17605483b08efa677b
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("11.611222182529532438"))
dataMap.set("openNotional", BigDecimal.fromString("-38294.307258434358042703"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x70931eea1b99488d3635d57291d1112602e9d0eef25953ae526e664455492af6", baseTokenMap)

// trader: 0x3e0cf03f718520f30300266dcf4db50ba12d3331
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("2.131156679357967021"))
dataMap.set("openNotional", BigDecimal.fromString("-149.887618028468785475"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x5faa136fc58b6136ffdaeaac320076c4865c070f", dataMap)
hardFixedDataMap.set("0x5156f93f35600f6552e9156c0a386f7c4fedf6de6b6f3f694ff6d5688562f5f6", baseTokenMap)

// trader: 0xe3dff97e14f3a55228ed2f614114bf6b27a7677b
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.119669839554999952"))
dataMap.set("openNotional", BigDecimal.fromString("-363.370519860094175779"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x75e9f5d77b65bac4bfef8907373c34ab28ad06be20ffdb2805d3dbda0022e776", baseTokenMap)

// trader: 0x3e0cf03f718520f30300266dcf4db50ba12d3331
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.759497415283091751"))
dataMap.set("openNotional", BigDecimal.fromString("-7326.991208998719728665"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xd6d30154ec4173152b862c019a6acc91fd4ff0a83ababdc66824c86f85de6ce1", baseTokenMap)

// trader: 0xa2b2001f3ad95a27a0ff81fce8ee403c9906fa39
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("399.954088938469590122"))
dataMap.set("openNotional", BigDecimal.fromString("-26999.999999841356118591"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x5faa136fc58b6136ffdaeaac320076c4865c070f", dataMap)
hardFixedDataMap.set("0x6ed5d8a8a202f5dffbb2f0a320f342167e5001a5cb96c175f45acdb90d40e066", baseTokenMap)

// trader: 0xa2b2001f3ad95a27a0ff81fce8ee403c9906fa39
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.361895022378773604"))
dataMap.set("openNotional", BigDecimal.fromString("-53999.999998757838400327"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x24e5db9b10e25ab3e0b3dba2d4e458e62e9cab008b1d4afd2b5d45db881a7700", baseTokenMap)

// trader: 0x724e940c7a9ec75619ad0897ae6e0cb7ee0ffae7
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.012528712305794782"))
dataMap.set("openNotional", BigDecimal.fromString("-499.999999982281129291"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x0ed57b320957e7b6b8e291175a6fd2d6a7ac54b9ee952e97da30052aa8c9c982", baseTokenMap)

// trader: 0xa2b2001f3ad95a27a0ff81fce8ee403c9906fa39
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("29.478564350767093168"))
dataMap.set("openNotional", BigDecimal.fromString("-79999.999998794574625623"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x27e9cca01c397ba9961c20f810cd5e62f33549c440c055120abb96537614bd6c", baseTokenMap)

// trader: 0x9b959697b7eca47e22914ab3a8b39d8e4217d9d4
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.39064174052525113"))
dataMap.set("openNotional", BigDecimal.fromString("-1124.516672171050373218"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x8f14534369596a69241a0fe0ca80258c423af82ac9a115fb5570fa1fb28fe18e", baseTokenMap)

// trader: 0x681a44e2904748ca7e40c56346f70be2a2d33347
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.92970178523414354"))
dataMap.set("openNotional", BigDecimal.fromString("-4619.999997546081883712"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x484725da73c1b7e5492e8ec5b80a14e8c911eed63d81e1c86a4ec0b087c05e6a", baseTokenMap)

// trader: 0xb6b6da5977955f29cc47100ae03e70fb21f22ce3
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.096410742479219979"))
dataMap.set("openNotional", BigDecimal.fromString("-299.999999999999999999"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xb1b6a841639620b422fdde7d51cfdeca9251c391b3ac31be8a7c1f181318b4cc", baseTokenMap)

// trader: 0x41bb08c5f310dd5eb32289a621efa54d8ac89f0b
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("-0.039954489457722421"))
dataMap.set("openNotional", BigDecimal.fromString("1555.127228243860136824"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x86f1e0420c26a858fc203a3645dd1a36868f18e5", dataMap)
hardFixedDataMap.set("0x9e3aba5a6ad16823d980cf47b6dd69d8b36b8e484d4034269192a7fb7fe65093", baseTokenMap)

// trader: 0xd48b17b111579360d1465ccc470144967505c053
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("-0.16183201636787185"))
dataMap.set("openNotional", BigDecimal.fromString("460.262177409893236047"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0xb79f9cd5a2197a4e6b86c473616e78efdae04dcb249f595953db10ad6f7d8945", baseTokenMap)

// trader: 0x4a9a3815060c3bd08fb4d44c9e74513874771b0c
dataMap = new TypedMap<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("-0.458491209143917227"))
dataMap.set("openNotional", BigDecimal.fromString("1324.16408235348743063"))
baseTokenMap = new TypedMap<string, DataMap>()
baseTokenMap.set("0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb", dataMap)
hardFixedDataMap.set("0x6bc313f1f3359475225d446408b40cae11dfc3f305a96950a9d4ccd3f8c8aec0", baseTokenMap)
