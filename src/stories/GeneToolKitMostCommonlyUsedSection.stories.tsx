import GeneToolKitMostCommonlyUsedSection from "../sections/GeneToolKitMostCommonlyUsedSection";
import geneTookKitMostCommonlyUsed from "../api/graphql/geneTookKitMostCommonlyUsed";

export default {
    component: GeneToolKitMostCommonlyUsedSection,
    title: 'GeneToolKitMostCommonlyUsedSection',
    tags: ['autodocs'],
    parameters: {
        apolloClient: {
            mocks: [{
                request: {
                    query: geneTookKitMostCommonlyUsed,
                    variables: {
                        geneId: "FBgnTEST"
                    }
                },
                result: {
                    "data": {
                        "classicalAndInsertionsAlleles": [
                            {
                                "alleles": [
                                    {
                                        "id": "FBal0327706",
                                        "paperCount": "0",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>MI02446-TG4.0</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096753",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>L1</up>",
                                        "classes": [
                                            {
                                                "name": "loss of function allele"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0220428",
                                        "paperCount": "1",
                                        "stocksCount": "1",
                                        "pubCount": "2",
                                        "symbol": "loco<up>GE24954</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0246454",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>358</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096750",
                                        "paperCount": "1",
                                        "stocksCount": "1",
                                        "pubCount": "2",
                                        "symbol": "loco<up>rC56</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0179031",
                                        "paperCount": "0",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>f04960</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0260332",
                                        "paperCount": "0",
                                        "stocksCount": "1",
                                        "pubCount": "1",
                                        "symbol": "loco<up>MI02446</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0179033",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "pubCount": "3",
                                        "symbol": "loco<up>d06164</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096755",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>A1</up>",
                                        "classes": [
                                            {
                                                "name": "loss of function allele"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0096757",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>Δ293</up>",
                                        "classes": [
                                            {
                                                "name": "loss of function allele"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0179032",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "2",
                                        "symbol": "loco<up>d09879</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096756",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>3-109</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0227644",
                                        "paperCount": "0",
                                        "stocksCount": "1",
                                        "pubCount": "1",
                                        "symbol": "loco<up>NP3117</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0129253",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "pubCount": "2",
                                        "symbol": "loco<up>C139</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096758",
                                        "paperCount": "5",
                                        "stocksCount": "1",
                                        "pubCount": "5",
                                        "symbol": "loco<up>Δ13</up>",
                                        "classes": [
                                            {
                                                "name": "loss of function allele"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0158997",
                                        "paperCount": "2",
                                        "stocksCount": "1",
                                        "pubCount": "3",
                                        "symbol": "loco<up>EY04589</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0227643",
                                        "paperCount": "0",
                                        "stocksCount": "1",
                                        "pubCount": "1",
                                        "symbol": "loco<up>NP3000</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0372911",
                                        "paperCount": "0",
                                        "stocksCount": "1",
                                        "pubCount": "1",
                                        "symbol": "loco<up>G4675</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0190826",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "pubCount": "2",
                                        "symbol": "loco<up>P452</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0246456",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>370</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0147043",
                                        "paperCount": "1",
                                        "stocksCount": "1",
                                        "pubCount": "2",
                                        "symbol": "loco<up>KG02176</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0190811",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "pubCount": "2",
                                        "symbol": "loco<up>P283</up>",
                                        "classes": [
                                            {
                                                "name": "amorphic allele - genetic evidence"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0191289",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>P237</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0246457",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>387</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0246453",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>318</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0258225",
                                        "paperCount": "0",
                                        "stocksCount": "1",
                                        "pubCount": "1",
                                        "symbol": "loco<up>MI01263</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096752",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "pubCount": "2",
                                        "symbol": "loco<up>M1</up>",
                                        "classes": [
                                            {
                                                "name": "loss of function allele"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0129252",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>a.96a.2A.hs</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0129254",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>371</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0282736",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>rev7</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0129251",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>a.96a.5A.hs</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096754",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>F1</up>",
                                        "classes": [
                                            {
                                                "name": "loss of function allele"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0246455",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "pubCount": "1",
                                        "symbol": "loco<up>455</up>",
                                        "classes": []
                                    },
                                    {
                                        "id": "FBal0096751",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "pubCount": "2",
                                        "symbol": "loco<up>T1</up>",
                                        "classes": [
                                            {
                                                "name": "loss of function allele"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "transgenicConstructs": [
                            {
                                "alleles": [
                                    {
                                        "id": "FBal0286569",
                                        "paperCount": "0",
                                        "stocksCount": "1",
                                        "symbol": "loco<up>UAS.ORF.Tag:HA</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "wild_type"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UASt"
                                            }
                                        ],
                                        "taggedWith": [
                                            {
                                                "symbol": "Tag:HA"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0196072",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>UAS.cSa</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "wild_type"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UAS"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0129249",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>a.96a.hs</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "antisense"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "Hsp70"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0190533",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>c1.UAS</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "cDNA"
                                            },
                                            {
                                                "transgenicProductClass": "wild_type"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UASt"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0209936",
                                        "paperCount": "5",
                                        "stocksCount": "1",
                                        "symbol": "loco<up>GD1282</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "RNAi_reagent"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UASt"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0189785",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>hs.2xT:Zzzz\\FLAG</up>",
                                        "transgenicProductClasses": [],
                                        "classes": [],
                                        "regRegions": [],
                                        "taggedWith": [
                                            {
                                                "symbol": "Tag:FLAG"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0196071",
                                        "paperCount": "2",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>UAS.EGFP</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "wild_type"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UAS"
                                            }
                                        ],
                                        "taggedWith": [
                                            {
                                                "symbol": "EGFP"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "FBal0258739",
                                        "paperCount": "1",
                                        "stocksCount": "1",
                                        "symbol": "loco<up>KK100249</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "RNAi_reagent"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UASt"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0189719",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>c1ΔRGS.UAS</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "inframe_deletion"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UASt"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0370470",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>RNAi.UAS.cUa</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "RNAi_reagent"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UAS"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0189740",
                                        "paperCount": "1",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>c1ΔGoLoco.UAS</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "inframe_deletion"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UASt"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0248211",
                                        "paperCount": "0",
                                        "stocksCount": "1",
                                        "symbol": "loco<up>HMS00455</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "RNAi_reagent"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UAS"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0286568",
                                        "paperCount": "0",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>UAS.ORF</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "wild_type"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "UASt"
                                            }
                                        ],
                                        "taggedWith": []
                                    },
                                    {
                                        "id": "FBal0286568",
                                        "paperCount": "0",
                                        "stocksCount": "0",
                                        "symbol": "loco<up>UAS.ORF</up>",
                                        "transgenicProductClasses": [
                                            {
                                                "transgenicProductClass": "wild_type"
                                            },{
                                                "transgenicProductClass": "genomic_DNA"
                                            }
                                        ],
                                        "classes": [],
                                        "regRegions": [
                                            {
                                                "symbol": "FBgnTEST"
                                            }
                                        ],
                                        "taggedWith": []
                                    }
                                ]
                            }
                        ]
                    }
                }
            }]
        }
    }
};

export const Default = {
    args: {},
};
