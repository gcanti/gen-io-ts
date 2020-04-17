/**
 * @since 0.4.4
 */
import { URIS, Kind } from 'fp-ts/lib/HKT'
import * as S from 'io-ts/lib/Schemable'

/**
 * @since 0.4.4
 */
export interface Referenceable<URI extends URIS>
  extends S.WithUnknownContainers1<URI>,
    S.WithUnion1<URI>,
    S.Schemable1<URI> {
  readonly reference: (id: string) => Kind<URI, unknown>
}
