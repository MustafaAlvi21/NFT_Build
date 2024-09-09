
// QUERY SERVICES
const { getComissionLevelService } = require('../services/comissionLevel-services');
const { getSingleUserService, getUsersService } = require('../services/user-services');
const { validateAll } = require('../utils/validate');



const getTeamMembersRevenueEarnings = async (req, res) => {

    const userID = req.user._id;

    try {


        const user = await getSingleUserService({ _id: userID }, "full")



        function sumReferredTotalCommissions(data) {
            let totalSum = 0;

            // Recursive function to traverse the nested structure
            function traverseAndSum(obj) {
                if (obj.totalComission !== undefined) {
                    totalSum += obj.totalComission;
                }

                if (Array.isArray(obj.referredTo)) {
                    obj.referredTo.forEach(ref => {
                        if (Array.isArray(ref.affiliate)) {
                            ref.affiliate.forEach(traverseAndSum);
                        } else if (typeof ref.affiliate === 'object') {
                            traverseAndSum(ref.affiliate);
                        }
                    });
                }
            }

            // Start traversing from the root user's referredTo
            data.referredTo.forEach(ref => {
                if (Array.isArray(ref.affiliate)) {
                    ref.affiliate.forEach(traverseAndSum);
                } else if (typeof ref.affiliate === 'object') {
                    traverseAndSum(ref.affiliate);
                }
            });

            return totalSum;

        }


        function countTotalAffiliates(referredToData) {
            let totalAffiliates = 0;

            // Recursive function to traverse the nested structure
            function traverseAndCount(obj) {
                if (Array.isArray(obj.affiliate)) {
                    totalAffiliates += obj.affiliate.length;
                    obj.affiliate.forEach(traverseAndCount);
                } else if (typeof obj.affiliate === 'object') {
                    totalAffiliates += 1;
                    traverseAndCount(obj.affiliate);
                } else if (typeof obj.affiliate === 'string') {
                    totalAffiliates += 1;
                }

                if (Array.isArray(obj.referredTo)) {
                    obj.referredTo.forEach(traverseAndCount);
                }
            }

            // Start traversing from the root user's referredTo
            referredToData.forEach(traverseAndCount);

            return totalAffiliates;
        }


        function transformAffiliateStructure(data) {
            // Helper function to transform a single referredTo item
            function transformReferredTo(referredToItem) {
                if (referredToItem.affiliate && Array.isArray(referredToItem.affiliate)) {
                    referredToItem.affiliate = referredToItem.affiliate[0];
                }

                if (referredToItem.affiliate && Array.isArray(referredToItem.affiliate.referredTo)) {
                    referredToItem.affiliate.referredTo = referredToItem.affiliate.referredTo.map(transformReferredTo);
                }

                return referredToItem;
            }

            // Clone the original data to avoid modifying it
            const transformedData = JSON.parse(JSON.stringify(data));

            // Transform referredTo array
            if (Array.isArray(transformedData.referredTo)) {
                transformedData.referredTo = transformedData.referredTo.map(transformReferredTo);
            }

            return transformedData;
        }


        function transformAndCleanAffiliateStructure(data) {
            // Helper function to transform and clean a single referredTo item
            function transformAndCleanReferredTo(referredToItem) {
                if (referredToItem.affiliate && Array.isArray(referredToItem.affiliate)) {
                    referredToItem.affiliate = referredToItem.affiliate[0];
                }

                if (referredToItem.affiliate && Array.isArray(referredToItem.affiliate.referredTo)) {
                    referredToItem.affiliate.referredTo = referredToItem.affiliate.referredTo
                        .map(transformAndCleanReferredTo)
                        .filter(item => item !== null);
                }

                // Remove the affiliate if it's a string or doesn't have expected properties
                if (typeof referredToItem.affiliate === 'string' ||
                    (referredToItem.affiliate && !referredToItem.affiliate.walletAddress)) {
                    return null;
                }

                return referredToItem;
            }

            // Clone the original data to avoid modifying it
            const transformedData = JSON.parse(JSON.stringify(data));

            // Transform and clean referredTo array
            if (Array.isArray(transformedData.referredTo)) {
                transformedData.referredTo = transformedData.referredTo
                    .map(transformAndCleanReferredTo)
                    .filter(item => item !== null);
            }

            return transformedData;
        }


        function structureDataForTeamList(data) {
            const { referredTo, ...rest } = data;
            const updatedData = {
                ...rest,
                referredTo: [],
            };

            function addToReferredTo(affiliate, level) {
                const affiliateWithLevel = {
                    ...affiliate,
                    Level: level,
                };

                updatedData.referredTo.push(affiliateWithLevel);

                if (affiliate.referredTo && affiliate.referredTo.length > 0) {
                    affiliate.referredTo.forEach((nested) => {
                        addToReferredTo(nested.affiliate, level + 1);
                    });
                }
            }

            referredTo.forEach((affiliate) => {
                addToReferredTo(affiliate.affiliate, 1);
            });

            return updatedData;
        }


        function dragComissionToAffiliate(obj, parentId) {
            if (obj.referredTo) {
                for (let ref of obj.referredTo) {
                    const affiliate = ref.affiliate;
                    if (affiliate.referredBy) {
                        for (let i = 0; i < affiliate.referredBy.length; i++) {
                            const sponsor = affiliate.referredBy[i];
                            if (sponsor.sponsorID === parentId) {
                                // Move sponsorComission to affiliate object
                                affiliate.sponsorComission = sponsor.sponsorComission;
                                // Remove the sponsor entry from referredBy array
                                affiliate.referredBy.splice(i, 1);
                                break;
                            }
                        }
                    }
                    // Recursive call to process nested affiliates
                    dragComissionToAffiliate(affiliate, parentId);
                }
            }
        }




        console.log("user", user);
        const earnings = sumReferredTotalCommissions(user)

        console.log("earnings", earnings);

        const transformedData = transformAffiliateStructure(user);
        console.log("transformedData", transformedData);
        const finalData = transformAndCleanAffiliateStructure(transformedData)
        console.log("finalData", finalData);



        dragComissionToAffiliate(finalData, finalData._id);
        const teamMembers = countTotalAffiliates(finalData.referredTo);
        const teamList = structureDataForTeamList(finalData);

        return res.json({ success: true, message: finalData, teamMembers, earnings, teamList })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}

function calculateDescendantInvestment(_id, data, level = 4) {
    let totalInvestment = 0;

    function findDescendants(parentId, currentLevel) {
        if (currentLevel > level) return;

        const descendants = data.filter(person =>
            person.referredBy.some(ref => ref.sponsorID === parentId)
        );

        descendants.forEach(descendant => {
            totalInvestment += descendant.totalInvestment;
            findDescendants(descendant._id, currentLevel + 1);
        });
    }

    findDescendants(_id, 1);
    return totalInvestment;
}

const revenueCalculations = async (req, res) => {
    try {
        const data = await getUsersService()
        //   const idToCheck = '6699369fba930f6a17d86314';
        const idToCheck = req.user._id;

        if (data.length > 0) {
            const totalInvestment = calculateDescendantInvestment(idToCheck, data);
            console.log(`Total investment of descendants for ID ${idToCheck}: ${totalInvestment}`);

            return res.status(200).json({ success: true, message: totalInvestment })
        }
        else
        {
            throw "No data"
        }
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ success: false, message: e })
    }
}

// revenueCalculations()


module.exports = {
    revenueCalculations,
    getTeamMembersRevenueEarnings
}