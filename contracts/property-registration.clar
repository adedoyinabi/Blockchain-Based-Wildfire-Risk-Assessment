;; Property Registration Contract
;; Records details of structures in fire-prone areas

(define-data-var last-property-id uint u0)

(define-map properties
  { property-id: uint }
  {
    owner: principal,
    location: (string-utf8 100),
    size: uint,
    construction-type: (string-utf8 50),
    risk-zone: (string-utf8 20),
    registration-time: uint
  }
)

(define-public (register-property
                (location (string-utf8 100))
                (size uint)
                (construction-type (string-utf8 50))
                (risk-zone (string-utf8 20)))
  (let ((new-id (+ (var-get last-property-id) u1)))
    (var-set last-property-id new-id)
    (ok (map-insert properties
                    { property-id: new-id }
                    {
                      owner: tx-sender,
                      location: location,
                      size: size,
                      construction-type: construction-type,
                      risk-zone: risk-zone,
                      registration-time: block-height
                    }))))

(define-read-only (get-property (property-id uint))
  (map-get? properties { property-id: property-id }))

(define-read-only (get-property-count)
  (var-get last-property-id))

(define-public (update-risk-zone (property-id uint) (new-risk-zone (string-utf8 20)))
  (let ((property (unwrap! (get-property property-id) (err u1))))
    (asserts! (is-eq tx-sender (get owner property)) (err u2))
    (ok (map-set properties
                 { property-id: property-id }
                 (merge property { risk-zone: new-risk-zone })))))

