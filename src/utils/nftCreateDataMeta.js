export const nftCreateDataMeta = ({
    name,
    symbol,
    description,
    seller_fee_basis_points,
    image,
    external_url,
    collection_name,
    collection_family,
    attributes,
    properties,
    category,
    creator
}) => {
    return {
        name: name,
        symbol: symbol,
        description: description,
        seller_fee_basis_points: seller_fee_basis_points,
        image: image,
        external_url: external_url,
        collection: {
            name: collection_name,
            family: collection_family
        },
        attributes: [{
                trait_type: "Attributes Count",
                value: 2
            },
            {
                trait_type: "Type",
                value: "Skeleton"
            },
            {
                trait_type: "Clothes",
                value: "Orange Jacket"
            },
            {
                trait_type: "Ears",
                value: "None"
            },
            {
                trait_type: "Mouth",
                value: "None"
            },
            {
                trait_type: "Eyes",
                value: "None"
            },
            {
                trait_type: "Hat",
                value: "Crown"
            }
        ],
        properties: {
            files: [{
                uri: properties,
                type: "image/png"
            }],
            category: category,
            creators: [{
                address: creator,
                verified: true,
                share: 100
            }]
        }
    }
}