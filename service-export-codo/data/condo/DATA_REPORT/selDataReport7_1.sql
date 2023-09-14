-- SELECT MIN(TTX1.S_D_FUR_AR) MIN_S_D_FUR_AR, MAX(TTX1.S_D_FUR_AR) MAX_S_D_FUR_AR, TTX1.DATE_PRICE, COUNT(S_D_FUR_AR) COUNT_S_D_FUR_AR, SUM(TTX1.S_D_FUR_AR) SUM_S_D_FUR_AR
-- FROM (
-- SELECT TTA1.CONDO_B_ID, TTA1.BUILD_NO, TTA1.OFLEVEL_ORDER, CAST(ROUND((TTA1.S_D_FUR / TTA1.AREA_CONTRACT),0) AS int) AS S_D_FUR_AR, DATE_PRICE, ROOM_TYPE_ID
--   FROM(
--     SELECT T4.CONDO_B_ID, T4.BUILD_NO, T3.OFLEVEL_ORDER, (ISNULL(T1.PRICE_S,0) - ISNULL(T1.PRICE_DISCOUNT,0) - ISNULL(T1.PRICE_FUR_EDIT_AREA,0)) AS S_D_FUR, T1.AREA_CONTRACT, T1.DATE_PRICE, T2.ROOM_TYPE_ID
--     FROM(
--     SELECT CONDO_S_ID, CONDO_H_ID, PRICE_S, PRICE_DISCOUNT, (ISNULL(PRICE_FUR_EDIT_AREA,0) * ISNULL(AREA_CONTRACT,0)) PRICE_FUR_EDIT_AREA, AREA_CONTRACT, FORMAT(CAST(DATE_PRICE AS date),N'yyyy','th-TH') DATE_PRICE
--     FROM condo.dbo.NCONDO_SALES_ROOM
--     WHERE CONDO_S_ID = @CONDO_S_ID
--     ) T1
--     LEFT OUTER JOIN
--     (
--     SELECT CONDO_S_ID, CONDO_H_ID, CONDO_L_ID, ROOM_TYPE_ID
--     FROM condo.dbo.NCONDO_HEADER
--     ) T2
--     ON T1.CONDO_S_ID = T2.CONDO_S_ID
--     AND T1.CONDO_H_ID = T2.CONDO_H_ID
--     LEFT OUTER JOIN
--     (
--     SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, OFLEVEL, OFLEVEL_ORDER
--     FROM condo.dbo.NCONDO_LEVEL
--     ) T3
--     ON T1.CONDO_S_ID = T3.CONDO_S_ID
--     AND T2.CONDO_L_ID = T3.CONDO_L_ID
--     LEFT OUTER JOIN
--     (
--     SELECT CONDO_S_ID, CONDO_B_ID, BUILD_NO
--     FROM condo.dbo.NCONDO_BUILD
--     ) T4
--     ON T1.CONDO_S_ID = T4.CONDO_S_ID
--     AND T3.CONDO_B_ID = T4.CONDO_B_ID
--   ) TTA1
--   WHERE ROOM_TYPE_ID IN (1,2,3,4,5,6,7,8,9,10)
-- ) TTX1
-- WHERE TTX1.DATE_PRICE IS NOT NULL
-- GROUP BY TTX1.DATE_PRICE

SELECT MIN(TTX1.S_D_FUR_AR) MIN_S_D_FUR_AR, MAX(TTX1.S_D_FUR_AR) MAX_S_D_FUR_AR, TTX1.DATE_PRICE, COUNT(S_D_FUR_AR) COUNT_S_D_FUR_AR, SUM(TTX1.S_D_FUR_AR) SUM_S_D_FUR_AR, TTX1.BUILD_NO
FROM (
SELECT TTA1.CONDO_B_ID, TTA1.BUILD_NO, TTA1.OFLEVEL_ORDER, CAST(ROUND((TTA1.S_D_FUR / TTA1.AREA_CONTRACT),0) AS int) AS S_D_FUR_AR, DATE_PRICE, ROOM_TYPE_ID
  FROM(
    SELECT T4.CONDO_B_ID, T4.BUILD_NO, T3.OFLEVEL_ORDER, (ISNULL(T1.PRICE_S,0) - ISNULL(T1.PRICE_DISCOUNT,0) - ISNULL(T1.PRICE_FUR_EDIT_AREA,0)) AS S_D_FUR, T1.AREA_CONTRACT, T1.DATE_PRICE, T2.ROOM_TYPE_ID
    FROM(
    SELECT CONDO_S_ID, CONDO_H_ID, PRICE_S, PRICE_DISCOUNT, (ISNULL(PRICE_FUR_EDIT_AREA,0) * ISNULL(AREA_CONTRACT,0)) PRICE_FUR_EDIT_AREA, AREA_CONTRACT, FORMAT(CAST(DATE_PRICE AS date),N'yyyy','th-TH') DATE_PRICE
    FROM condo.dbo.NCONDO_SALES_ROOM
    WHERE CONDO_S_ID = @CONDO_S_ID
    ) T1
    LEFT OUTER JOIN
    (
    SELECT CONDO_S_ID, CONDO_H_ID, CONDO_L_ID, ROOM_TYPE_ID
    FROM condo.dbo.NCONDO_HEADER
    ) T2
    ON T1.CONDO_S_ID = T2.CONDO_S_ID
    AND T1.CONDO_H_ID = T2.CONDO_H_ID
    LEFT OUTER JOIN
    (
    SELECT CONDO_S_ID, CONDO_B_ID, CONDO_L_ID, OFLEVEL, OFLEVEL_ORDER
    FROM condo.dbo.NCONDO_LEVEL
    ) T3
    ON T1.CONDO_S_ID = T3.CONDO_S_ID
    AND T2.CONDO_L_ID = T3.CONDO_L_ID
    LEFT OUTER JOIN
    (
    SELECT CONDO_S_ID, CONDO_B_ID, BUILD_NO
    FROM condo.dbo.NCONDO_BUILD
    ) T4
    ON T1.CONDO_S_ID = T4.CONDO_S_ID
    AND T3.CONDO_B_ID = T4.CONDO_B_ID
  ) TTA1
  WHERE ROOM_TYPE_ID IN (1,2,3,4,5,6,7,8,9,10)
) TTX1
WHERE TTX1.DATE_PRICE IS NOT NULL
GROUP BY TTX1.DATE_PRICE, BUILD_NO